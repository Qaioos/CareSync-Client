import { MdBadge } from "react-icons/md";
import type { StrapiUser } from "../../../../Types/api.responses";
import { getDisplayName, getInitials } from "../staff.utils";
import { formatStaffProfileDate } from "../../../../Features/staffProfile/staffProfile.utils";

const StaffProfileSummary = ({ member }: { member: StrapiUser }) => (
    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <section className="flex items-center gap-3 rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.04)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d9efea] text-sm font-extrabold text-primary-container">
                {getInitials(getDisplayName(member))}
            </div>
            <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-[#91a5a2]">
                    Username
                </p>
                <p className="truncate font-bold text-[#163432]">
                    {member.username}
                </p>
            </div>
        </section>

        <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.04)]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#91a5a2]">
                Account role
            </p>
            <p className="mt-1 flex items-center gap-2 font-bold text-[#163432]">
                <MdBadge
                    aria-hidden="true"
                    className="text-primary-container"
                />
                {member.role?.name || "Authenticated"}
            </p>
        </section>

        <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.04)]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#91a5a2]">
                Account status
            </p>
            <p
                className={`mt-1 font-bold ${member.blocked ? "text-[#b42318]" : "text-[#15803d]"}`}
            >
                {member.blocked ? "Blocked" : "Active"}
            </p>
            <p className="mt-1 text-xs text-[#7b918e]">
                Email {member.confirmed ? "confirmed" : "not confirmed"}
            </p>
            <p className="mt-1 text-xs text-[#7b918e]">
                Joined {formatStaffProfileDate(member.createdAt)}
            </p>
            <p className="mt-1 text-xs text-[#7b918e]">
                Last updated {formatStaffProfileDate(member.updatedAt)}
            </p>
        </section>
    </div>
);

export default StaffProfileSummary;
