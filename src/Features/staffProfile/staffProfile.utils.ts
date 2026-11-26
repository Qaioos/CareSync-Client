import type { AxiosError } from "axios";
import type { StrapiUser } from "../../Types/api.responses";
import type { Shift, ShiftStaff } from "../../Types/scheduling";
import type {
    StaffProfileFormData,
    StaffProfileUpdatePayload,
} from "./staffProfile.types";

const USERNAME_PATTERN = /^[A-Za-z0-9_]{3,20}$/;
const PASSWORD_PATTERN =
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%])[A-Za-z0-9!@#$%]{8,24}$/;

export const isValidStaffId = (userId?: string) =>
    Boolean(userId && /^\d+$/.test(userId));

export const getStaffFromResponse = (payload: unknown): StrapiUser | null => {
    if (typeof payload !== "object" || payload === null) return null;
    const result = "data" in payload ? payload.data : payload;
    if (
        typeof result !== "object" ||
        result === null ||
        !("id" in result) ||
        typeof result.id !== "number"
    ) {
        return null;
    }
    return result as StrapiUser;
};

export const getArrayFromResponse = <T,>(payload: unknown): T[] => {
    if (Array.isArray(payload)) return payload as T[];
    if (typeof payload === "object" && payload !== null && "data" in payload) {
        return Array.isArray(payload.data) ? (payload.data as T[]) : [];
    }
    return [];
};

export const createStaffProfileFormData = (
    member: StrapiUser,
): StaffProfileFormData => ({
    FullName: member.FullName || "",
    username: member.username || "",
    email: member.email || "",
    Department: member.Department || "",
    Title_Degree: member.Title_Degree || "",
    Unit_Floor: member.Unit_Floor || "",
    IsAvailabale: member.IsAvailabale === true,
    blocked: member.blocked,
    newPassword: "",
    confirmPassword: "",
});

export const getStaffProfileValidationError = (
    formData: StaffProfileFormData,
) => {
    if (!USERNAME_PATTERN.test(formData.username)) {
        return "Username must be 3-20 characters using letters, numbers, or underscores.";
    }
    if (formData.newPassword && !PASSWORD_PATTERN.test(formData.newPassword)) {
        return "New password must be 8-24 characters and include a letter, a number, and one of ! @ # $ %.";
    }
    if (formData.newPassword !== formData.confirmPassword) {
        return "New passwords do not match.";
    }
    return "";
};

export const createStaffUpdatePayload = (
    formData: StaffProfileFormData,
): StaffProfileUpdatePayload => {
    const updates: StaffProfileUpdatePayload = {
        FullName: formData.FullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        Department: formData.Department.trim() || null,
        Title_Degree: formData.Title_Degree.trim() || null,
        Unit_Floor: formData.Unit_Floor.trim() || null,
        IsAvailabale: formData.IsAvailabale,
        blocked: formData.blocked,
    };
    if (formData.newPassword) updates.password = formData.newPassword;
    return updates;
};

export const getStaffProfileRequestError = (
    error: unknown,
    fallback: string,
) => {
    const axiosError = error as AxiosError<{
        error?: { message?: string };
        message?: string;
    }>;
    return (
        axiosError.response?.data?.error?.message ||
        axiosError.response?.data?.message ||
        (error instanceof Error ? error.message : fallback)
    );
};

export const isCanceledRequest = (error: unknown) => {
    const axiosError = error as AxiosError;
    return (
        axiosError.name === "CanceledError" ||
        axiosError.code === "ERR_CANCELED"
    );
};

const getAssignees = (
    assignedStaff: Shift["AssignedStaff"],
): ShiftStaff[] => {
    if (!assignedStaff) return [];
    return Array.isArray(assignedStaff) ? assignedStaff : [assignedStaff];
};

export const getStaffAssignedShifts = (
    shifts: Shift[],
    member: StrapiUser,
) =>
    shifts
        .filter((shift) =>
            getAssignees(shift.AssignedStaff).some(
                (assigned) =>
                    assigned.id === member.id ||
                    Boolean(
                        member.documentId &&
                            assigned.documentId === member.documentId,
                    ),
            ),
        )
        .sort(
            (first, second) =>
                new Date(first.StartTime).getTime() -
                new Date(second.StartTime).getTime(),
        );

export const formatStaffProfileDate = (date: string) => {
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "Unknown";
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(parsedDate);
};
