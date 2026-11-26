import {
    MdCheckCircle,
    MdGroups,
    MdWarning,
} from "react-icons/md";
import type { StrapiUser } from "../../../Types/api.responses";
import { getDisplayName, getInitials } from "../Staff/staff.utils";

interface DepartmentStaffListProps {
    staff: StrapiUser[];
    isLoading: boolean;
    error: string;
}

const DepartmentStaffList = ({
    staff,
    isLoading,
    error,
}: DepartmentStaffListProps) => (
    <section className="overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_8px_24px_rgba(15,118,110,0.04)]">
        <div className="border-b border-[#e7efed] px-5 py-4">
            <h2 className="text-lg font-bold text-[#163432]">
                Responsible nurses and staff
            </h2>
            <p className="mt-1 text-sm text-[#7b918e]">
                Staff accounts assigned to this department.
            </p>
        </div>

        {isLoading ? (
            <div className="animate-pulse space-y-4 p-5" aria-label="Loading staff">
                {[1, 2, 3].map((row) => (
                    <div key={row} className="h-14 rounded-xl bg-[#edf3f1]" />
                ))}
            </div>
        ) : error ? (
            <div
                role="alert"
                className="flex items-center gap-2 p-5 text-sm text-[#a12b20]"
            >
                <MdWarning aria-hidden="true" />
                {error}
            </div>
        ) : staff.length === 0 ? (
            <div className="px-5 py-10 text-center">
                <MdGroups className="mx-auto text-3xl text-[#91a5a2]" />
                <p className="mt-2 text-sm font-semibold text-[#365653]">
                    No staff are assigned to this department.
                </p>
            </div>
        ) : (
            <div className="divide-y divide-[#edf3f1]">
                {staff.map((member) => (
                    <article
                        key={member.documentId || member.id}
                        className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d9efea] text-sm font-extrabold text-primary-container">
                                {getInitials(getDisplayName(member))}
                            </div>
                            <div className="min-w-0">
                                <h3 className="truncate text-sm font-bold text-[#163432]">
                                    {getDisplayName(member)}
                                </h3>
                                <p className="truncate text-xs text-[#7b918e]">
                                    {member.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                            <span className="font-medium text-[#365653]">
                                {member.Title_Degree || member.role?.name || "Staff"}
                            </span>
                            {member.Unit_Floor && (
                                <span className="text-[#7b918e]">
                                    {member.Unit_Floor}
                                </span>
                            )}
                            <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-bold ${
                                    member.IsAvailabale
                                        ? "bg-[#eaf8ef] text-[#15803d]"
                                        : "bg-[#f1f5f4] text-[#718783]"
                                }`}
                            >
                                <MdCheckCircle aria-hidden="true" />
                                {member.IsAvailabale
                                    ? "Available"
                                    : "Unavailable"}
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        )}
    </section>
);

export default DepartmentStaffList;
