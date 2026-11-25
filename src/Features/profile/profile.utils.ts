import type { StrapiUser } from "../../Types/api.responses";
import type { ProfileEditData } from "../../Types/profile";

export const createProfileEditData = (user: StrapiUser): ProfileEditData => ({
    FullName: user.FullName || "",
});

export const getProfileDisplayName = (user: StrapiUser) =>
    user.FullName?.trim() || user.username || "Administrator";

export const getProfileInitials = (name: string) =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
