import { useEffect, useMemo, useState } from "react";
import type { AxiosError } from "axios";
import {
    MdAccessTime,
    MdAdd,
    MdCalendarMonth,
    MdCheckCircle,
    MdGroups,
    MdWarning,
} from "react-icons/md";
import Layout from "../Components/Admin/Pages/Layout";
import AdminPageHeader from "../Components/Admin/Shared/AdminPageHeader";
import ResourceToolbar from "../Components/Admin/Shared/ResourceToolbar";
import {
    ResourceLoading,
    ResourceState,
} from "../Components/Admin/Shared/ResourceState";
import SummaryCard from "../Components/Admin/Shared/SummaryCard";
import ShiftRow from "../Components/Admin/Scheduling/ShiftRow";
import { getShiftStaff } from "../Components/Admin/Scheduling/scheduling.utils";
import { useAxiosPrivate } from "../Hook/RequestsWithToken/useAxiosPrivet";
import type { Shift } from "../Types/scheduling";

type ShiftFilter = "all" | "Day" | "Evening" | "Night";

const isToday = (date: string) =>
    new Date(date).toDateString() === new Date().toDateString();

const Scheduling = () => {
    const axiosPrivate = useAxiosPrivate();
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [shiftFilter, setShiftFilter] = useState<ShiftFilter>("all");

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const loadShifts = async () => {
            try {
                setIsLoading(true);
                const response = await axiosPrivate.get<Shift[]>(
                    "/shifts?populate=AssignedStaff",
                    { signal: controller.signal },
                );
                const payload = response.data as unknown;
                const result = Array.isArray(payload)
                    ? payload
                    : (payload as { data?: Shift[] })?.data;

                if (isMounted) {
                    setShifts(Array.isArray(result) ? result : []);
                    setError("");
                }
            } catch (requestError) {
                const axiosError = requestError as AxiosError;
                if (isMounted && axiosError.name !== "CanceledError") {
                    setError("Unable to load the schedule right now.");
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadShifts();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate]);

    const filteredShifts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return [...shifts]
            .filter((shift) => {
                const searchable = [
                    shift.Department,
                    shift.ShiftType,
                    getShiftStaff(shift),
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return (
                    searchable.includes(query) &&
                    (shiftFilter === "all" || shift.ShiftType === shiftFilter)
                );
            })
            .sort(
                (first, second) =>
                    new Date(first.StartTime).getTime() -
                    new Date(second.StartTime).getTime(),
            );
    }, [search, shiftFilter, shifts]);

    const todayCount = shifts.filter((shift) =>
        isToday(shift.StartTime),
    ).length;
    const assignedCount = shifts.filter(
        (shift) => getShiftStaff(shift) !== "Unassigned",
    ).length;
    const departmentsCount = new Set(
        shifts.map((shift) => shift.Department).filter(Boolean),
    ).size;

    return (
        <>
            <Layout />
            <main className="min-h-screen bg-[#f4f8f7] px-4 pb-20 pt-24 md:ml-72 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <AdminPageHeader
                        eyebrow="Workforce planning"
                        title="Scheduling"
                        description="See coverage at a glance and keep every clinical shift coordinated."
                        action={
                            <button
                                type="button"
                                disabled
                                title="Shift creation will be enabled when the API workflow is connected"
                                className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#dce9e6] px-4 py-3 text-sm font-bold text-[#7b918e]"
                            >
                                <MdAdd className="text-lg" aria-hidden="true" />
                                Create shift
                            </button>
                        }
                    />

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <SummaryCard
                            icon={<MdCalendarMonth />}
                            label="Scheduled shifts"
                            value={shifts.length}
                            tone="teal"
                        />
                        <SummaryCard
                            icon={<MdAccessTime />}
                            label="Today"
                            value={todayCount}
                            tone="amber"
                        />
                        <SummaryCard
                            icon={<MdCheckCircle />}
                            label="Assigned shifts"
                            value={assignedCount}
                            tone="green"
                        />
                    </div>

                    <section className="overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_12px_30px_rgba(15,118,110,0.06)]">
                        <div className="flex flex-col gap-4 border-b border-[#e7efed] p-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold text-[#163432]">
                                        Shift board
                                    </h3>
                                    <span className="rounded-full bg-[#e5f5f1] px-2 py-1 text-[10px] font-bold text-primary-container">
                                        {departmentsCount} departments
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-[#7b918e]">
                                    {filteredShifts.length} of {shifts.length}{" "}
                                    shifts shown
                                </p>
                            </div>
                            <ResourceToolbar
                                search={search}
                                onSearchChange={setSearch}
                                searchPlaceholder="Search department or staff..."
                                filterValue={shiftFilter}
                                onFilterChange={setShiftFilter}
                                filterLabel="Filter by shift"
                                filterOptions={[
                                    { label: "All shifts", value: "all" },
                                    { label: "Day", value: "Day" },
                                    { label: "Evening", value: "Evening" },
                                    { label: "Night", value: "Night" },
                                ]}
                            />
                        </div>

                        {isLoading ? (
                            <ResourceLoading />
                        ) : error ? (
                            <ResourceState
                                icon={<MdWarning />}
                                title="Could not load the schedule"
                                description={error}
                            />
                        ) : filteredShifts.length === 0 ? (
                            <ResourceState
                                icon={<MdGroups />}
                                title="No shifts found"
                                description="Try another search or shift type."
                            />
                        ) : (
                            <div className="divide-y divide-[#edf3f1]">
                                {filteredShifts.map((shift) => (
                                    <ShiftRow
                                        key={shift.documentId || shift.id}
                                        shift={shift}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
};

export default Scheduling;
