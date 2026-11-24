import type { StrapiUser } from "../../../Types/api.responses";

export const getDisplayName = (staff: StrapiUser) =>
    staff.FullName?.trim() || staff.username || "Unnamed staff member";

export const getInitials = (name: string) =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
