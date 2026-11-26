import type { StrapiUser } from "../../Types/api.responses";

export interface StaffProfileFormData {
    FullName: string;
    username: string;
    email: string;
    Department: string;
    Title_Degree: string;
    Unit_Floor: string;
    IsAvailabale: boolean;
    blocked: boolean;
    newPassword: string;
    confirmPassword: string;
}

export type StaffProfileUpdatePayload = Pick<
    StrapiUser,
    | "FullName"
    | "username"
    | "email"
    | "Department"
    | "Title_Degree"
    | "Unit_Floor"
    | "IsAvailabale"
    | "blocked"
> & { password?: string };
