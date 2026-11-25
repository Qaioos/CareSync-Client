import {
    MdBadge,
    MdCheckCircle,
    MdEmail,
    MdLocalHospital,
    MdPerson,
} from "react-icons/md";
import type { StrapiUser } from "../../../Types/api.responses";
import {
    getProfileDisplayName,
    getProfileInitials,
} from "../../../Features/profile/profile.utils";

interface ProfileIdentityCardProps {
    profile: StrapiUser;
    fallbackRole: string | null;
}

const ProfileIdentityCard = ({
    profile,
    fallbackRole,
}: ProfileIdentityCardProps) => {
    const displayName = getProfileDisplayName(profile);
    const initials = getProfileInitials(displayName);

    return (
        <section className="rounded-2xl border border-[#dce9e6] bg-white p-6 shadow-[0_12px_30px_rgba(15,118,110,0.05)] lg:col-span-4">
            <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#d9efea] text-2xl font-extrabold text-primary-container shadow-[0_0_0_1px_#dce9e6]">
                    {initials || <MdPerson aria-hidden="true" />}
                </div>
                <h2 className="mt-4 text-xl font-extrabold text-[#163432]">
                    {displayName}
                </h2>
                <p className="mt-1 text-sm text-[#718783]">
                    {profile.Title_Degree || "Administrator"}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#eaf8ef] px-3 py-1 text-xs font-bold text-[#15803d]">
                    <MdCheckCircle aria-hidden="true" />
                    {profile.IsAvailabale ? "Available" : "Not available"}
                </span>
            </div>

            <div className="mt-6 space-y-4 border-t border-[#edf3f1] pt-5">
                <ProfileFact
                    icon={<MdEmail />}
                    label="Email"
                    value={profile.email}
                />
                <ProfileFact
                    icon={<MdBadge />}
                    label="Role"
                    value={
                        profile.role?.name || fallbackRole || "Administrator"
                    }
                />
                <ProfileFact
                    icon={<MdLocalHospital />}
                    label="Department"
                    value={profile.Department || "Not assigned"}
                />
            </div>
        </section>
    );
};

const ProfileFact = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => (
    <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5f1] text-lg text-primary-container">
            {icon}
        </span>
        <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#91a5a2]">
                {label}
            </p>
            <p className="truncate text-sm font-semibold text-[#365653]">
                {value}
            </p>
        </div>
    </div>
);

export default ProfileIdentityCard;
