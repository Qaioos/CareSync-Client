import { MdBadge, MdCheckCircle, MdEmail, MdLocalHospital } from "react-icons/md";
import type { StrapiUser } from "../../../Types/api.responses";
import { getProfileDisplayName } from "../../../Features/profile/profile.utils";
import ProfileAvatarField from "./ProfileAvatarField";

interface ProfileIdentityCardProps {
    profile: StrapiUser;
    fallbackRole: string | null;
    isUploadingAvatar: boolean;
    avatarError: string;
    onAvatarChange: (file: File) => Promise<boolean>;
}

const ProfileIdentityCard = ({
    profile,
    fallbackRole,
    isUploadingAvatar,
    avatarError,
    onAvatarChange,
}: ProfileIdentityCardProps) => {
    const displayName = getProfileDisplayName(profile);

    return (
        <section className="rounded-2xl border border-[#dce9e6] bg-white p-6 shadow-[0_12px_30px_rgba(15,118,110,0.05)] lg:col-span-4">
            <div className="flex flex-col items-center text-center">
                <ProfileAvatarField
                    profile={profile}
                    isUploading={isUploadingAvatar}
                    error={avatarError}
                    onChange={onAvatarChange}
                />
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
