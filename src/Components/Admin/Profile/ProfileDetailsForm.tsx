import { useState, type FormEvent } from "react";
import { MdEdit, MdSave } from "react-icons/md";
import type { StrapiUser } from "../../../Types/api.responses";
import ProfileInput from "./ProfileInput";
import ProfileReadOnlyField from "./ProfileReadOnlyField";

interface ProfileDetailsFormProps {
    profile: StrapiUser;
    fullName: string;
    isSaving: boolean;
    error: string;
    loadError: string;
    onFullNameChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<boolean>;
}

const ProfileDetailsForm = ({
    profile,
    fullName,
    isSaving,
    error,
    loadError,
    onFullNameChange,
    onSubmit,
}: ProfileDetailsFormProps) => {
    const [isEditingName, setIsEditingName] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const saved = await onSubmit(event);
        if (saved) setIsEditingName(false);
    };

    const cancelNameEdit = () => {
        onFullNameChange(profile.FullName || "");
        setIsEditingName(false);
    };

    return (
        <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_12px_30px_rgba(15,118,110,0.05)] sm:p-7 lg:col-span-8">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-extrabold text-[#163432]">
                        Profile information
                    </h2>
                    <p className="mt-1 text-sm text-[#7b918e]">
                        Account access and clinical assignments are protected
                        from self-editing.
                    </p>
                </div>
                {!isEditingName && (
                    <button
                        type="button"
                        onClick={() => setIsEditingName(true)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#dce9e6] px-3 py-2 text-sm font-bold text-[#365653] transition hover:bg-[#f8fcfb] focus:outline-none focus:ring-4 focus:ring-primary/10"
                    >
                        <MdEdit aria-hidden="true" className="text-lg" />
                        Edit name
                    </button>
                )}
            </div>

            {loadError && (
                <p className="mb-4 rounded-xl border border-[#f4dfb2] bg-[#fff9eb] px-4 py-3 text-sm text-[#8a5a08]">
                    {loadError}
                </p>
            )}
            {error && (
                <p
                    role="alert"
                    className="mb-4 rounded-xl border border-[#f2c9c4] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#a12b20]"
                >
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {isEditingName ? (
                        <ProfileInput
                            id="profile-full-name"
                            label="Full name"
                            value={fullName}
                            onChange={onFullNameChange}
                            required
                        />
                    ) : (
                        <ProfileReadOnlyField
                            label="Full name"
                            value={profile.FullName}
                        />
                    )}
                    <ProfileReadOnlyField
                        label="Username"
                        value={profile.username}
                    />
                    <ProfileReadOnlyField
                        label="Email address"
                        value={profile.email}
                    />
                    <ProfileReadOnlyField
                        label="Role / degree"
                        value={profile.Title_Degree}
                    />
                    <ProfileReadOnlyField
                        label="Department"
                        value={profile.Department}
                    />
                    <ProfileReadOnlyField
                        label="Unit / floor"
                        value={profile.Unit_Floor}
                    />
                </div>

                <ProfileReadOnlyField
                    label="Shift availability"
                    value={profile.IsAvailabale ? "Available" : "Not available"}
                />

                {isEditingName && (
                    <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#edf3f1] pt-5 sm:flex-row">
                        <button
                            type="button"
                            disabled={isSaving}
                            onClick={cancelNameEdit}
                            className="rounded-xl border border-[#dce9e6] px-4 py-2.5 text-sm font-bold text-[#607774] transition hover:bg-[#f8fcfb] disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(15,118,110,0.18)] transition hover:bg-[#115e59] focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-wait disabled:opacity-70"
                        >
                            <MdSave className="text-lg" aria-hidden="true" />
                            {isSaving ? "Saving name..." : "Save name"}
                        </button>
                    </div>
                )}
            </form>
        </section>
    );
};

export default ProfileDetailsForm;
