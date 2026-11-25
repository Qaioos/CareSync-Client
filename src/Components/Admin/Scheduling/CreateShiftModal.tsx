import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { AxiosError } from "axios";
import { MdAdd, MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { useAxiosPrivate } from "../../../Hook/RequestsWithToken/useAxiosPrivet";
import type { StrapiUser } from "../../../Types/api.responses";

interface CreateShiftModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
}

interface ShiftFormData {
    Department: "" | "ICU" | "Emergency" | "Med_Surg";
    ShiftType: "" | "Day" | "Evening" | "Night";
    StartTime: string;
    EndTime: string;
    AssignedStaff: string;
}

const initialFormData: ShiftFormData = {
    Department: "",
    ShiftType: "",
    StartTime: "",
    EndTime: "",
    AssignedStaff: "",
};

const inputClassName =
    "w-full rounded-xl border border-[#dce9e6] bg-[#f8fcfb] px-3.5 py-2.5 text-sm text-[#163432] outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";
const labelClassName = "mb-1.5 block text-xs font-bold text-[#365653]";

const getUsersFromResponse = (payload: unknown): StrapiUser[] => {
    if (Array.isArray(payload)) return payload as StrapiUser[];
    if (typeof payload === "object" && payload !== null) {
        const data = (payload as { data?: StrapiUser[] }).data;
        if (Array.isArray(data)) return data;
    }
    return [];
};

const formatStaffName = (member: StrapiUser) => {
    const fullName = member.FullName?.trim();
    const displayName = (fullName || member.username).replace(/_+/g, " ");

    if (fullName && fullName.toLowerCase() !== member.username.toLowerCase()) {
        return `${displayName} (@${member.username})`;
    }

    return displayName;
};

const formatDepartmentName = (department: string) =>
    department === "Med_Surg" ? "Med/Surg" : department;

const CreateShiftModal = ({
    isOpen,
    onClose,
    onCreated,
}: CreateShiftModalProps) => {
    const axiosPrivate = useAxiosPrivate();
    const shouldReduceMotion = useReducedMotion();
    const [formData, setFormData] = useState(initialFormData);
    const [staff, setStaff] = useState<StrapiUser[]>([]);
    const [isLoadingStaff, setIsLoadingStaff] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        const controller = new AbortController();
        let isMounted = true;

        const loadStaff = async () => {
            setIsLoadingStaff(true);
            try {
                const response = await axiosPrivate.get("/users", {
                    signal: controller.signal,
                });
                if (isMounted) setStaff(getUsersFromResponse(response.data));
            } catch (requestError) {
                const axiosError = requestError as AxiosError;
                if (isMounted && axiosError.name !== "CanceledError") {
                    setError(
                        "Staff list could not be loaded. You can still create an unassigned shift.",
                    );
                }
            } finally {
                if (isMounted) setIsLoadingStaff(false);
            }
        };

        loadStaff();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate, isOpen]);

    const handleClose = () => {
        if (isSubmitting) return;
        setFormData(initialFormData);
        setError("");
        onClose();
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const startDate = new Date(formData.StartTime);
        const endDate = new Date(formData.EndTime);
        if (endDate.getTime() <= startDate.getTime()) {
            setError("Shift end time must be after its start time.");
            return;
        }

        setIsSubmitting(true);
        try {
            const shiftData = {
                Department: formData.Department,
                ShiftType: formData.ShiftType,
                StartTime: startDate.toISOString(),
                EndTime: endDate.toISOString(),
                ...(formData.AssignedStaff
                    ? {
                          AssignedStaff: {
                              connect: [formData.AssignedStaff],
                          },
                      }
                    : {}),
            };

            await axiosPrivate.post("/shifts", { data: shiftData });
            toast.success("Shift created successfully.");
            onCreated();
            setFormData(initialFormData);
            onClose();
        } catch (requestError) {
            const axiosError = requestError as AxiosError<{
                error?: { message?: string };
                message?: string;
            }>;
            const serverMessage =
                axiosError.response?.data?.error?.message ||
                axiosError.response?.data?.message;
            setError(
                serverMessage ||
                    "Could not create the shift. Please try again.",
            );
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
                        aria-label="Close shift form"
                        className="fixed inset-0 bg-[#163432]/45 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />
                    <motion.section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="create-shift-title"
                        className="relative z-10 my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_24px_70px_rgba(15,50,45,0.2)]"
                        initial={{
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : 18,
                            scale: shouldReduceMotion ? 1 : 0.98,
                        }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                        transition={{
                            duration: shouldReduceMotion ? 0.15 : 0.25,
                        }}
                    >
                        <div className="flex items-start justify-between border-b border-[#e7efed] px-5 py-4 sm:px-7">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f5f1] text-xl text-primary-container">
                                    <MdAdd aria-hidden="true" />
                                </div>
                                <div>
                                    <h2
                                        id="create-shift-title"
                                        className="text-lg font-extrabold text-[#163432]"
                                    >
                                        Create shift
                                    </h2>
                                    <p className="mt-1 text-sm text-[#7b918e]">
                                        Schedule department coverage and assign
                                        a team member.
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
                                <div>
                                    <label
                                        className={labelClassName}
                                        htmlFor="shift-department"
                                    >
                                        Department
                                    </label>
                                    <select
                                        id="shift-department"
                                        required
                                        value={formData.Department}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                Department: event.target
                                                    .value as ShiftFormData["Department"],
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
                                        <option value="Med_Surg">
                                            Med/Surg
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className={labelClassName}
                                        htmlFor="shift-type"
                                    >
                                        Shift type
                                    </label>
                                    <select
                                        id="shift-type"
                                        required
                                        value={formData.ShiftType}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                ShiftType: event.target
                                                    .value as ShiftFormData["ShiftType"],
                                            }))
                                        }
                                        className={inputClassName}
                                    >
                                        <option value="" disabled>
                                            Select shift
                                        </option>
                                        <option value="Day">Day</option>
                                        <option value="Evening">Evening</option>
                                        <option value="Night">Night</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className={labelClassName}
                                        htmlFor="shift-start"
                                    >
                                        Start time
                                    </label>
                                    <input
                                        id="shift-start"
                                        type="datetime-local"
                                        required
                                        value={formData.StartTime}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                StartTime: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                    />
                                </div>
                                <div>
                                    <label
                                        className={labelClassName}
                                        htmlFor="shift-end"
                                    >
                                        End time
                                    </label>
                                    <input
                                        id="shift-end"
                                        type="datetime-local"
                                        required
                                        value={formData.EndTime}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                EndTime: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        className={labelClassName}
                                        htmlFor="shift-staff"
                                    >
                                        Assigned staff{" "}
                                        <span className="font-normal text-[#91a5a2]">
                                            (optional)
                                        </span>
                                    </label>
                                    <select
                                        id="shift-staff"
                                        value={formData.AssignedStaff}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                AssignedStaff:
                                                    event.target.value,
                                            }))
                                        }
                                        disabled={isLoadingStaff}
                                        className={inputClassName}
                                    >
                                        <option value="">
                                            Leave unassigned
                                        </option>
                                        {staff.map((member) => (
                                            <option
                                                key={
                                                    member.documentId ||
                                                    member.id
                                                }
                                                value={member.documentId}
                                            >
                                                {formatStaffName(member)}{" "}
                                                {member.Department
                                                    ? `· ${formatDepartmentName(member.Department)}`
                                                    : ""}
                                            </option>
                                        ))}
                                    </select>
                                    {isLoadingStaff && (
                                        <p className="mt-1.5 text-xs text-[#7b918e]">
                                            Loading team members...
                                        </p>
                                    )}
                                </div>
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
                                    disabled={isSubmitting || isLoadingStaff}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(15,118,110,0.18)] transition hover:bg-[#115e59] focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-wait disabled:opacity-70"
                                >
                                    <MdAdd
                                        aria-hidden="true"
                                        className="text-lg"
                                    />
                                    {isSubmitting
                                        ? "Creating shift..."
                                        : "Create shift"}
                                </button>
                            </div>
                        </form>
                    </motion.section>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateShiftModal;
