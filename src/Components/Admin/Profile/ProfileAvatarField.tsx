import { MdPerson, MdPhotoCamera } from "react-icons/md";
import type { StrapiUser } from "../../../Types/api.responses";
import { getProfileAvatarUrl, getProfileInitials, getProfileDisplayName } from "../../../Features/profile/profile.utils";

interface ProfileAvatarFieldProps {
    profile: StrapiUser;
    isUploading: boolean;
    error: string;
    onChange: (file: File) => Promise<boolean>;
}

const ProfileAvatarField = ({
    profile,
    isUploading,
    error,
    onChange,
}: ProfileAvatarFieldProps) => {
    const displayName = getProfileDisplayName(profile);
    const avatarUrl = getProfileAvatarUrl(profile);

    return (
        <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#d9efea] text-2xl font-extrabold text-primary-container shadow-[0_0_0_1px_#dce9e6]">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={`${displayName} profile`}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    getProfileInitials(displayName) || (
                        <MdPerson aria-hidden="true" />
                    )
                )}
            </div>
            <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#dce9e6] px-3 py-2 text-xs font-bold text-[#365653] transition hover:bg-[#f8fcfb] has-[:disabled]:cursor-wait has-[:disabled]:opacity-60">
                <MdPhotoCamera aria-hidden="true" />
                {isUploading ? "Uploading photo..." : "Change profile photo"}
                <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    disabled={isUploading}
                    onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) void onChange(file);
                        event.currentTarget.value = "";
                    }}
                />
            </label>
            <p className="mt-1 text-[11px] text-[#91a5a2]">
                PNG, JPG or WebP · Up to 5 MB
            </p>
            {error && (
                <p role="alert" className="mt-2 text-xs text-[#a12b20]">
                    {error}
                </p>
            )}
        </div>
    );
};

export default ProfileAvatarField;
