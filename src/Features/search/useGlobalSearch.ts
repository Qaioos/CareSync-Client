import { useEffect, useMemo, useState } from "react";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import type { StrapiUser } from "../../Types/api.responses";
import type { Shift } from "../../Types/scheduling";
import type {
    GlobalSearchResult,
    GlobalSearchType,
} from "./globalSearch.types";

const unwrapArray = <T,>(payload: unknown): T[] => {
    if (Array.isArray(payload)) return payload as T[];
    if (
        typeof payload === "object" &&
        payload !== null &&
        "data" in payload &&
        Array.isArray(payload.data)
    ) {
        return payload.data as T[];
    }
    return [];
};

const unwrapRecord = (payload: unknown): Record<string, unknown> => {
    const records = unwrapArray<Record<string, unknown>>(payload);
    return records[0] || {};
};

const getText = (value: unknown) =>
    typeof value === "string" || typeof value === "number"
        ? String(value)
        : "";

const useGlobalSearch = (query: string) => {
    const axiosPrivate = useAxiosPrivate();
    const [results, setResults] = useState<GlobalSearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const normalizedQuery = query.trim().toLowerCase();

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        if (normalizedQuery.length < 2) {
            return () => {
                isMounted = false;
                controller.abort();
            };
        }

        const timer = window.setTimeout(async () => {
            if (!isMounted) return;
            setIsSearching(true);
            setResults([]);
            try {
                const responses = await Promise.allSettled([
                    axiosPrivate.get<unknown>("/users", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get<unknown>("/department-metrics", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get<unknown>("/department-emergencies", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get<unknown>("/department-med-surgs", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get<unknown>("/shifts?populate=AssignedStaff", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get<unknown>("/requests?populate=Sender", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get<unknown>("/tasks", {
                        signal: controller.signal,
                    }),
                ]);

                const getData = (index: number): unknown =>
                    responses[index].status === "fulfilled"
                        ? responses[index].value.data
                        : null;

                const nextResults: GlobalSearchResult[] = [];
                const matches = (values: unknown[]) =>
                    values
                        .map(getText)
                        .join(" ")
                        .toLowerCase()
                        .includes(normalizedQuery);

                unwrapArray<StrapiUser>(getData(0)).forEach((user) => {
                    if (
                        matches([
                            user.FullName,
                            user.username,
                            user.email,
                            user.Department,
                            user.Title_Degree,
                            user.Unit_Floor,
                        ])
                    ) {
                        nextResults.push({
                            id: `staff-${user.id}`,
                            type: "staff",
                            title: user.FullName || user.username || "Staff member",
                            subtitle: [
                                user.Department,
                                user.Title_Degree,
                                user.email,
                            ]
                                .filter(Boolean)
                                .join(" · "),
                            to: `/admin/staff/${user.id}`,
                        });
                    }
                });

                const departments: Array<{
                    name: string;
                    key: "icu" | "emergency" | "medSurg";
                    payload: unknown;
                }> = [
                    { name: "ICU", key: "icu", payload: getData(1) },
                    {
                        name: "Emergency",
                        key: "emergency",
                        payload: getData(2),
                    },
                    {
                        name: "Med/Surg",
                        key: "medSurg",
                        payload: getData(3),
                    },
                ];

                departments.forEach((department) => {
                    const record = unwrapRecord(department.payload);
                    if (
                        matches([
                            department.name,
                            record.ActiveBeds,
                            record.TotalBeds,
                            record.WaitingCount,
                            record.Situation,
                        ])
                    ) {
                        nextResults.push({
                            id: `department-${department.key}`,
                            type: "department",
                            title: department.name,
                            subtitle: `${getText(record.ActiveBeds) || "0"} active · ${getText(record.TotalBeds) || "0"} total beds · ${getText(record.Situation) || "Normal"}`,
                            to: `/admin/departments/${department.key}`,
                        });
                    }
                });

                unwrapArray<Shift>(getData(4)).forEach((shift, index) => {
                    const assigned = Array.isArray(shift.AssignedStaff)
                        ? shift.AssignedStaff
                        : shift.AssignedStaff
                          ? [shift.AssignedStaff]
                          : [];
                    const staffNames = assigned
                        .map((member) => member.FullName || member.username)
                        .filter(Boolean)
                        .join(", ");
                    if (
                        matches([
                            shift.Department,
                            shift.ShiftType,
                            shift.StartTime,
                            shift.EndTime,
                            staffNames,
                        ])
                    ) {
                        nextResults.push({
                            id: `shift-${shift.documentId || shift.id || index}`,
                            type: "shift",
                            title: `${shift.Department || "Department"} · ${shift.ShiftType || "Shift"}`,
                            subtitle: `${staffNames || "Unassigned"} · ${getText(shift.StartTime)}`,
                            to: "/admin/scheduling",
                        });
                    }
                });

                unwrapArray<Record<string, unknown>>(getData(5)).forEach(
                    (request, index) => {
                        if (
                            matches([
                                request.Details,
                                request.RequestType,
                                request.Room_Number,
                                request.Situation,
                            ])
                        ) {
                            nextResults.push({
                                id: `request-${getText(request.documentId) || getText(request.id) || index}`,
                                type: "request",
                                title: getText(request.RequestType) ||
                                    "Operational request",
                                subtitle: [
                                    request.Details,
                                    request.Room_Number
                                        ? `Room ${getText(request.Room_Number)}`
                                        : "",
                                    request.Situation,
                                ]
                                    .map(getText)
                                    .filter(Boolean)
                                    .join(" · "),
                                to: "/admin/notifications",
                            });
                        }
                    },
                );

                unwrapArray<Record<string, unknown>>(getData(6)).forEach(
                    (task, index) => {
                        if (
                            matches([
                                task.Title,
                                task.Description,
                                task.PatientName,
                                task.Room,
                                task.Priority,
                                task.Worker,
                            ])
                        ) {
                            nextResults.push({
                                id: `task-${getText(task.documentId) || getText(task.id) || index}`,
                                type: "task",
                                title: getText(task.Title) || "Clinical task",
                                subtitle: [
                                    task.PatientName,
                                    task.Room,
                                    task.Priority,
                                    task.Worker,
                                ]
                                    .map(getText)
                                    .filter(Boolean)
                                    .join(" · "),
                                to: "/admin",
                            });
                        }
                    },
                );

                if (isMounted) setResults(nextResults.slice(0, 12));
            } finally {
                if (isMounted) setIsSearching(false);
            }
        }, 250);

        return () => {
            isMounted = false;
            window.clearTimeout(timer);
            controller.abort();
        };
    }, [axiosPrivate, normalizedQuery]);

    const counts = useMemo(
        () =>
            results.reduce(
                (current, result) => ({
                    ...current,
                    [result.type]: (current[result.type as GlobalSearchType] ||
                        0) + 1,
                }),
                {} as Partial<Record<GlobalSearchType, number>>,
            ),
        [results],
    );

    return { results, counts, isSearching };
};

export default useGlobalSearch;
