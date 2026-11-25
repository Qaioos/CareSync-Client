import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { AxiosError } from "axios";
import { MdClose, MdPersonAdd } from "react-icons/md";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../Config/axios";
import { useAxiosPrivate } from "../../../Hook/RequestsWithToken/useAxiosPrivet";
import type { AuthResponse } from "../../../Types/api.responses";

interface AddStaffModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
}

interface StaffFormData {
    FullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    Department: string;
    Title_Degree: string;
    Unit_Floor: string;
    IsAvailabale: boolean;
}

const initialFormData: StaffFormData = {
    FullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    Department: "",
    Title_Degree: "",
    Unit_Floor: "",
    IsAvailabale: true,
};

const USERNAME_PATTERN = /^[A-Za-z0-9_]{3,20}$/;
const PASSWORD_PATTERN =
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%])[A-Za-z0-9!@#$%]{8,24}$/;

const inputClassName =
    "w-full rounded-xl border border-[#dce9e6] bg-[#f8fcfb] px-3.5 py-2.5 text-sm text-[#163432] outline-none transition placeholder:text-[#91a5a2] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";
const labelClassName = "mb-1.5 block text-xs font-bold text-[#365653]";

const AddStaffModal = ({ isOpen, onClose, onCreated }: AddStaffModalProps) => {
    const axiosPrivate = useAxiosPrivate();
    const shouldReduceMotion = useReducedMotion();
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [createdUserId, setCreatedUserId] = useState<number | null>(null);

    const handleClose = () => {
        if (isSubmitting) return;
        if (!createdUserId) setFormData(initialFormData);
        setError("");
        onClose();
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!createdUserId && !USERNAME_PATTERN.test(formData.username)) {
            setError(
                "Username must be 3-20 characters using letters, numbers, or underscores.",
            );
            return;
        }

        if (!createdUserId && !PASSWORD_PATTERN.test(formData.password)) {
            setError(
                "Password must be 8-24 characters and include a letter, a number, and one of ! @ # $ %.",
            );
            return;
        }

        if (!createdUserId && formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        let userId = createdUserId;

        try {
            if (!userId) {
                const response = await axiosInstance.post<AuthResponse>(
                    "/auth/local/register",
                    {
                        username: formData.username.trim(),
                        email: formData.email.trim(),
                        password: formData.password,
                    },
                );
                if (!response.data.user?.id) {
                    throw new Error(
                        "The server did not return the new user ID.",
                    );
                }
                userId = response.data.user.id;
                setCreatedUserId(userId);
                setFormData((current) => ({
                    ...current,
                    password: "",
                    confirmPassword: "",
                }));
                onCreated();
            }

            await axiosPrivate.put(`/users/${userId}`, {
                FullName: formData.FullName.trim(),
                Department: formData.Department,
                Title_Degree: formData.Title_Degree.trim(),
                Unit_Floor: formData.Unit_Floor.trim() || null,
                IsAvailabale: formData.IsAvailabale,
            });

            onCreated();
            toast.success("Staff member created successfully.");
            setFormData(initialFormData);
            setCreatedUserId(null);
            onClose();
        } catch (requestError) {
            const axiosError = requestError as AxiosError<{
                error?: { message?: string };
                message?: string;
            }>;
            const serverMessage =
                axiosError.response?.data?.error?.message ||
                axiosError.response?.data?.message;
            if (userId) {
                setCreatedUserId(userId);
                onCreated();
                setError(
                    `The account was created, but the staff profile could not be saved. ${serverMessage || "Retry saving the profile details."}`,
                );
            } else {
                setError(
                    serverMessage ||
                        "Could not create the staff account. Please try again.",
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-70 flex items-center justify-center overflow-y-auto p-4">
                    <motion.button
                        type="button"
                        aria-label="Close add staff form"
                        className="fixed inset-0 bg-[#163432]/45 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: shouldReduceMotion ? 0.1 : 0.2,
                        }}
                        onClick={handleClose}
                    />
                    <motion.section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-staff-title"
                        className="relative z-10 my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_24px_70px_rgba(15,50,45,0.2)]"
                        initial={{
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : 18,
                            scale: shouldReduceMotion ? 1 : 0.98,
                        }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : 10,
                            scale: shouldReduceMotion ? 1 : 0.99,
                        }}
                        transition={{
                            duration: shouldReduceMotion ? 0.15 : 0.25,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <div className="flex items-start justify-between border-b border-[#e7efed] px-5 py-4 sm:px-7">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f5f1] text-xl text-primary-container">
                                    <MdPersonAdd aria-hidden="true" />
                                </div>
                                <div>
                                    <h2
                                        id="add-staff-title"
                                        className="text-lg font-extrabold text-[#163432]"
                                    >
                                        Add staff member
                                    </h2>
                                    <p className="mt-1 text-sm text-[#7b918e]">
                                        {createdUserId
                                            ? "The account exists. Finish saving the clinical profile."
                                            : "Create an account and add clinical team details."}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                aria-label="Close"
                                disabled={isSubmitting}
                                onClick={handleClose}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#718783] transition hover:bg-[#f1f5f4] hover:text-[#163432] disabled:opacity-50"
                            >
                                <MdClose className="text-xl" />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="max-h-[calc(100dvh-10rem)] overflow-y-auto px-5 py-5 sm:px-7"
                        >
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
                                    <label
                                        className={labelClassName}
                                        htmlFor="staff-full-name"
                                    >
                                        Full name
                                    </label>
                                    <input
                                        id="staff-full-name"
                                        autoComplete="name"
                                        required
                                        value={formData.FullName}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                FullName: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                        placeholder="e.g. Alex Morgan"
                                    />
                                </div>
                                <div>
                                    <label
                                        className={labelClassName}
                                        htmlFor="staff-username"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="staff-username"
                                        autoComplete="username"
                                        required
                                        minLength={3}
                                        maxLength={20}
                                        disabled={Boolean(createdUserId)}
                                        value={formData.username}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                username: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                        placeholder="alex_morgan"
                                    />
                                </div>
                                <div>
                                    <label
                                        className={labelClassName}
                                        htmlFor="staff-email"
                                    >
                                        Work email
                                    </label>
                                    <input
                                        id="staff-email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        disabled={Boolean(createdUserId)}
                                        value={formData.email}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                email: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                        placeholder="name@hospital.com"
                                    />
                                </div>
                                <div>
                                    <label
                                        className={labelClassName}
                                        htmlFor="staff-department"
                                    >
                                        Department
                                    </label>
                                    <select
                                        id="staff-department"
                                        required
                                        value={formData.Department}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                Department: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                    >
                                        <option value="" disabled>
                                            Select department
                                        </option>
                                        <option value="ICU">ICU</option>
                                        <option value="Emergency">
                                            Emergency
                                        </option>
                                        <option value="Med/Surg">
                                            Med/Surg
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className={labelClassName}
                                        htmlFor="staff-title"
                                    >
                                        Role / degree
                                    </label>
                                    <input
                                        id="staff-title"
                                        required
                                        value={formData.Title_Degree}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                Title_Degree:
                                                    event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                        placeholder="Registered Nurse"
                                    />
                                </div>
                                <div>
                                    <label
                                        className={labelClassName}
                                        htmlFor="staff-unit"
                                    >
                                        Unit / floor{" "}
                                        <span className="font-normal text-[#91a5a2]">
                                            (optional)
                                        </span>
                                    </label>
                                    <input
                                        id="staff-unit"
                                        value={formData.Unit_Floor}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                Unit_Floor: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                        placeholder="e.g. 3rd floor"
                                    />
                                </div>
                                <div
                                    className="sm:col-span-2"
                                    hidden={Boolean(createdUserId)}
                                >
                                    <label
                                        className={labelClassName}
                                        htmlFor="staff-password"
                                    >
                                        Initial password
                                    </label>
                                    <input
                                        id="staff-password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        minLength={8}
                                        disabled={Boolean(createdUserId)}
                                        value={formData.password}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                password: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                        placeholder="Create a secure initial password"
                                    />
                                    <p className="mt-1.5 text-xs text-[#7b918e]">
                                        8-24 characters, with a letter, a
                                        number, and one of ! @ # $ %.
                                    </p>
                                </div>
                                <div
                                    className="sm:col-span-2"
                                    hidden={Boolean(createdUserId)}
                                >
                                    <label
                                        className={labelClassName}
                                        htmlFor="staff-confirm-password"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        id="staff-confirm-password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        disabled={Boolean(createdUserId)}
                                        value={formData.confirmPassword}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                confirmPassword:
                                                    event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                        placeholder="Re-enter the initial password"
                                    />
                                </div>
                                <label className="sm:col-span-2 flex cursor-pointer items-center justify-between rounded-xl border border-[#dce9e6] bg-[#f8fcfb] px-4 py-3">
                                    <span>
                                        <span className="block text-sm font-bold text-[#365653]">
                                            Available for shifts
                                        </span>
                                        <span className="mt-0.5 block text-xs text-[#7b918e]">
                                            Show this staff member as currently
                                            available.
                                        </span>
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={formData.IsAvailabale}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                IsAvailabale:
                                                    event.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 accent-primary-container"
                                    />
                                </label>
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#edf3f1] pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={handleClose}
                                    className="rounded-xl border border-[#dce9e6] px-4 py-2.5 text-sm font-bold text-[#607774] transition hover:bg-[#f8fcfb] disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(15,118,110,0.18)] transition hover:bg-[#115e59] focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-wait disabled:opacity-70"
                                >
                                    <MdPersonAdd
                                        aria-hidden="true"
                                        className="text-lg"
                                    />
                                    {isSubmitting
                                        ? createdUserId
                                            ? "Saving profile..."
                                            : "Creating account..."
                                        : createdUserId
                                          ? "Retry profile save"
                                          : "Create staff member"}
                                </button>
                            </div>
                        </form>
                    </motion.section>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddStaffModal;
