import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import type {
    AnalyticsDepartment,
    AnalyticsRequest,
    AnalyticsShift,
    AnalyticsUser,
} from "../../Types/analytics";
import { unwrapArray } from "../../Components/Admin/Analytics/analytics.utils";

const getDepartmentRecord = (payload: unknown) => {
    const records = unwrapArray<Record<string, unknown>>(payload);
    return records[0] ?? {};
};

export const useAnalytics = () => {
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState<AnalyticsUser[]>([]);
    const [shifts, setShifts] = useState<AnalyticsShift[]>([]);
    const [requests, setRequests] = useState<AnalyticsRequest[]>([]);
    const [departments, setDepartments] = useState<AnalyticsDepartment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const loadAnalytics = async () => {
            try {
                setIsLoading(true);

                const [
                    usersRes,
                    shiftsRes,
                    requestsRes,
                    icuRes,
                    medRes,
                    emergencyRes,
                ] = await Promise.all([
                    axiosPrivate.get("/users", { signal: controller.signal }),
                    axiosPrivate.get("/shifts?populate=AssignedStaff", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get("/requests?populate=Sender", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get("/department-metrics", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get("/department-med-surgs", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get("/department-emergencies", {
                        signal: controller.signal,
                    }),
                ]);

                const icu = getDepartmentRecord(icuRes.data);
                const med = getDepartmentRecord(medRes.data);
                const emergency = getDepartmentRecord(emergencyRes.data);

                const departmentRows: AnalyticsDepartment[] = [
                    {
                        name: "ICU",
                        activeBeds: Number(icu.ActiveBeds ?? 0),
                        totalBeds: Number(icu.TotalBeds ?? 0),
                        waitingCount: Number(icu.WaitingCount ?? 0),
                        situation: String(icu.Situation ?? "Normal"),
                    },
                    {
                        name: "Med/Surg",
                        activeBeds: Number(med.ActiveBeds ?? 0),
                        totalBeds: Number(med.TotalBeds ?? 0),
                        waitingCount: Number(med.WaitingCount ?? 0),
                        situation: String(med.Situation ?? "Normal"),
                    },
                    {
                        name: "Emergency",
                        activeBeds: Number(emergency.ActiveBeds ?? 0),
                        totalBeds: Number(emergency.TotalBeds ?? 0),
                        waitingCount: Number(emergency.WaitingCount ?? 0),
                        situation: String(emergency.Situation ?? "Normal"),
                    },
                ].filter(
                    (department) =>
                        department.totalBeds > 0 ||
                        department.activeBeds > 0 ||
                        department.waitingCount > 0,
                );

                if (isMounted) {
                    setUsers(unwrapArray<AnalyticsUser>(usersRes.data));
                    setShifts(unwrapArray<AnalyticsShift>(shiftsRes.data));
                    setRequests(
                        unwrapArray<AnalyticsRequest>(requestsRes.data),
                    );
                    setDepartments(departmentRows);
                    setError("");
                }
            } catch (requestError) {
                const axiosError = requestError as AxiosError;
                if (isMounted && axiosError.name !== "CanceledError") {
                    setError(
                        "Unable to load analytics right now. Please try again.",
                    );
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadAnalytics();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate]);

    return { users, shifts, requests, departments, isLoading, error };
};
