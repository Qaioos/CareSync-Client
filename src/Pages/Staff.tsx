import { useEffect, useMemo, useState } from "react";
import type { AxiosError } from "axios";
import {
    MdBadge,
    MdCheckCircle,
    MdGroups,
    MdPersonAdd,
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
import StaffRow from "../Components/Admin/Staff/StaffRow";
import { getDisplayName } from "../Components/Admin/Staff/staff.utils";
import { useAxiosPrivate } from "../Hook/RequestsWithToken/useAxiosPrivet";
import type { StrapiUser } from "../Types/api.responses";

type AvailabilityFilter = "all" | "available" | "unavailable";

const Staff = () => {
    const axiosPrivate = useAxiosPrivate();
    const [staff, setStaff] = useState<StrapiUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [availability, setAvailability] = useState<AvailabilityFilter>("all");

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const loadStaff = async () => {
            try {
                setIsLoading(true);
                const response = await axiosPrivate.get<StrapiUser[]>(
                    "/users",
                    {
                        signal: controller.signal,
                    },
                );
                const payload = response.data as unknown;
                const result = Array.isArray(payload)
                    ? payload
                    : (payload as { data?: StrapiUser[] })?.data;

                if (isMounted) {
                    setStaff(Array.isArray(result) ? result : []);
                    setError("");
                }
            } catch (requestError) {
                const axiosError = requestError as AxiosError;
                if (isMounted && axiosError.name !== "CanceledError") {
                    setError(
                        "Unable to load staff right now. Please try again.",
                    );
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadStaff();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate]);

    const filteredStaff = useMemo(() => {
        const query = search.trim().toLowerCase();

        return staff.filter((member) => {
            const matchesSearch = [
                getDisplayName(member),
                member.username,
                member.email,
                member.Department,
                member.Title_Degree,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
                .includes(query);
            const isAvailable = member.IsAvailabale === true;
            const matchesAvailability =
                availability === "all" ||
                (availability === "available" && isAvailable) ||
                (availability === "unavailable" && !isAvailable);

            return matchesSearch && matchesAvailability;
        });
    }, [availability, search, staff]);

    const availableCount = staff.filter(
        (member) => member.IsAvailabale === true,
    ).length;
    const departmentsCount = new Set(
        staff.map((member) => member.Department).filter(Boolean),
    ).size;

    return (
        <>
            <Layout />
            <main className="min-h-screen bg-[#f4f8f7] px-4 pb-20 pt-24 md:ml-72 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <AdminPageHeader
                        eyebrow="People & access"
                        title="Staff directory"
                        description="Keep your clinical team visible, searchable, and ready for the next shift."
                        action={
                            <button
                                type="button"
                                disabled
                                title="Staff creation will be enabled when the API endpoint is available"
                                className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#dce9e6] px-4 py-3 text-sm font-bold text-[#7b918e]"
                            >
                                <MdPersonAdd
                                    aria-hidden="true"
                                    className="text-lg"
                                />
                                Add staff member
                            </button>
                        }
                    />

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <SummaryCard
                            icon={<MdGroups />}
                            label="Total staff"
                            value={staff.length}
                            tone="teal"
                        />
                        <SummaryCard
                            icon={<MdCheckCircle />}
                            label="Available now"
                            value={availableCount}
                            tone="green"
                        />
                        <SummaryCard
                            icon={<MdBadge />}
                            label="Departments"
                            value={departmentsCount}
                            tone="amber"
                        />
                    </div>

                    <section className="overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_12px_30px_rgba(15,118,110,0.06)]">
                        <div className="flex flex-col gap-4 border-b border-[#e7efed] p-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-[#163432]">
                                    Team members
                                </h3>
                                <p className="mt-1 text-sm text-[#7b918e]">
                                    {filteredStaff.length} of {staff.length}{" "}
                                    members shown
                                </p>
                            </div>
                            <ResourceToolbar
                                search={search}
                                onSearchChange={setSearch}
                                searchPlaceholder="Search name, role, department..."
                                filterValue={availability}
                                onFilterChange={setAvailability}
                                filterLabel="Filter by availability"
                                filterOptions={[
                                    { label: "All statuses", value: "all" },
                                    { label: "Available", value: "available" },
                                    {
                                        label: "Unavailable",
                                        value: "unavailable",
                                    },
                                ]}
                            />
                        </div>

                        {isLoading ? (
                            <ResourceLoading />
                        ) : error ? (
                            <ResourceState
                                icon={<MdWarning />}
                                title="Could not load the staff directory"
                                description={error}
                            />
                        ) : filteredStaff.length === 0 ? (
                            <ResourceState
                                icon={<MdGroups />}
                                title="No staff members found"
                                description="Try another search or availability filter."
                            />
                        ) : (
                            <div className="divide-y divide-[#edf3f1]">
                                {filteredStaff.map((member) => (
                                    <StaffRow
                                        key={member.documentId || member.id}
                                        member={member}
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

export default Staff;
