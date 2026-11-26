import { MdCheckCircle, MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";
import type { StrapiUser } from "../../../Types/api.responses";
import { getDisplayName, getInitials } from "./staff.utils";

const StaffRow = ({ member }: { member: StrapiUser }) => {
    const name = getDisplayName(member);
    const isAvailable = member.IsAvailabale === true;

    return (
        <Link
            to={`/admin/staff/${member.id}`}
            aria-label={`View ${name}'s profile`}
            className="block rounded-sm outline-none transition hover:bg-[#f8fcfb] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        >
            <article className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d9efea] text-sm font-extrabold text-primary-container">
                        {getInitials(name)}
                    </div>
                    <div className="min-w-0">
                        <h4 className="truncate text-sm font-bold text-[#163432]">
                            {name}
                        </h4>
                        <p className="truncate text-xs text-[#7b918e]">
                            {member.email}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm md:flex md:items-center md:gap-10">
                    <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#91a5a2]">
                            Role
                        </p>
                        <p className="font-medium text-[#365653]">
                            {member.Title_Degree || "Clinical staff"}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#91a5a2]">
                            Department
                        </p>
                        <p className="font-medium text-[#365653]">
                            {member.Department || "Unassigned"}
                        </p>
                    </div>
                    <span
                        className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${isAvailable ? "bg-[#eaf8ef] text-[#15803d]" : "bg-[#f1f5f4] text-[#718783]"}`}
                    >
                        {isAvailable ? (
                            <MdCheckCircle aria-hidden="true" />
                        ) : (
                            <MdGroups aria-hidden="true" />
                        )}
                        {isAvailable ? "Available" : "Unavailable"}
                    </span>
                </div>
            </article>
        </Link>
    );
};

export default StaffRow;
