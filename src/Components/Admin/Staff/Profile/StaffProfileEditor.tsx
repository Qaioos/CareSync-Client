import { type FormEvent } from "react";
import { MdLockReset, MdPerson, MdSave } from "react-icons/md";
import type { StaffProfileFormData } from "../../../../Features/staffProfile/staffProfile.types";
import StaffProfileTextField from "./StaffProfileTextField";

interface StaffProfileEditorProps {
    formData: StaffProfileFormData;
    error: string;
    isSaving: boolean;
    onFieldChange: <K extends keyof StaffProfileFormData>(
        field: K,
        value: StaffProfileFormData[K],
    ) => void;
    onSave: () => Promise<boolean>;
}

const StaffProfileEditor = ({
    formData,
    error,
    isSaving,
    onFieldChange,
    onSave,
}: StaffProfileEditorProps) => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onSave();
    };

    return (
        <section className="overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_12px_30px_rgba(15,118,110,0.06)] lg:col-span-8">
            <div className="border-b border-[#e7efed] px-5 py-4 sm:px-7">
                <h2 className="flex items-center gap-2 font-extrabold text-[#163432]">
                    <MdPerson
                        aria-hidden="true"
                        className="text-xl text-primary-container"
                    />
                    Personal and work details
                </h2>
                <p className="mt-1 text-sm text-[#7b918e]">
                    Update the account and clinical information for this
                    employee.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-7">
                {error && (
                    <div
                        role="alert"
                        className="mb-4 rounded-xl border border-[#f2c9c4] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#a12b20]"
                    >
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <StaffProfileTextField
                            id="staff-profile-name"
                            label="Full name"
                            autoComplete="name"
                            required
                            value={formData.FullName}
                            onChange={(value) =>
                                onFieldChange("FullName", value)
                            }
                        />
                    </div>
                    <StaffProfileTextField
                        id="staff-profile-username"
                        label="Username"
                        autoComplete="username"
                        minLength={3}
                        maxLength={20}
                        required
                        value={formData.username}
                        onChange={(value) => onFieldChange("username", value)}
                    />
                    <StaffProfileTextField
                        id="staff-profile-email"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(value) => onFieldChange("email", value)}
                    />
                    <StaffProfileTextField
                        id="staff-profile-department"
                        label="Department"
                        value={formData.Department}
                        onChange={(value) => onFieldChange("Department", value)}
                    />
                    <StaffProfileTextField
                        id="staff-profile-title"
                        label="Role / degree"
                        value={formData.Title_Degree}
                        onChange={(value) =>
                            onFieldChange("Title_Degree", value)
                        }
                    />
                    <StaffProfileTextField
                        id="staff-profile-unit"
                        label="Unit / floor"
                        value={formData.Unit_Floor}
                        onChange={(value) => onFieldChange("Unit_Floor", value)}
                    />
                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#dce9e6] bg-[#f8fcfb] px-4 py-3">
                        <span className="text-sm font-bold text-[#365653]">
                            Available for shifts
                        </span>
                        <input
                            type="checkbox"
                            checked={formData.IsAvailabale}
                            onChange={(event) =>
                                onFieldChange(
                                    "IsAvailabale",
                                    event.target.checked,
                                )
                            }
                            className="h-4 w-4 accent-primary-container"
                        />
                    </label>
                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#f2c9c4] bg-[#fff8f7] px-4 py-3 sm:col-span-2">
                        <span>
                            <span className="block text-sm font-bold text-[#8e2c24]">
                                Block account
                            </span>
                            <span className="mt-0.5 block text-xs text-[#9b625c]">
                                Prevent this user from signing in.
                            </span>
                        </span>
                        <input
                            type="checkbox"
                            checked={formData.blocked}
                            onChange={(event) =>
                                onFieldChange("blocked", event.target.checked)
                            }
                            className="h-4 w-4 accent-red-700"
                        />
                    </label>
                </div>

                <section className="mt-6 rounded-xl border border-[#dce9e6] bg-[#f8fcfb] p-4">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[#365653]">
                        <MdLockReset aria-hidden="true" />
                        Reset password
                    </h3>
                    <p className="mt-1 text-xs text-[#7b918e]">
                        Passwords are never displayed. Leave these fields empty
                        to keep the current password.
                    </p>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <StaffProfileTextField
                            id="staff-profile-new-password"
                            label="New password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            maxLength={24}
                            value={formData.newPassword}
                            onChange={(value) =>
                                onFieldChange("newPassword", value)
                            }
                        />
                        <StaffProfileTextField
                            id="staff-profile-confirm-password"
                            label="Confirm new password"
                            type="password"
                            autoComplete="new-password"
                            value={formData.confirmPassword}
                            onChange={(value) =>
                                onFieldChange("confirmPassword", value)
                            }
                        />
                    </div>
                </section>

                <div className="mt-6 flex justify-end border-t border-[#edf3f1] pt-5">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(15,118,110,0.18)] transition hover:bg-[#115e59] focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-wait disabled:opacity-70"
                    >
                        <MdSave aria-hidden="true" className="text-lg" />
                        {isSaving ? "Saving changes..." : "Save changes"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default StaffProfileEditor;
