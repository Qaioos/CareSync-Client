import type { Shift } from "../../../Types/scheduling";

export const getShiftStaff = (shift: Shift) => {
    if (!shift.AssignedStaff) return "Unassigned";

    const assigned = Array.isArray(shift.AssignedStaff)
        ? shift.AssignedStaff
        : [shift.AssignedStaff];

    const names = assigned
        .map((member) => member.FullName || member.username)
        .filter(Boolean);

    return names.length ? names.join(", ") : "Unassigned";
};

export const formatShiftDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    }).format(new Date(date));

export const formatShiftTime = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(date));
