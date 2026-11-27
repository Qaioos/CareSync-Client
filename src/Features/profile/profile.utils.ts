import { axiosInstance } from "../../Config/axios";
import type {
    StrapiMedia,
    StrapiMediaValue,
    StrapiUser,
} from "../../Types/api.responses";
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

const getMedia = (value: StrapiMediaValue): StrapiMedia | null => {
    if (!value) return null;
    if ("data" in value) return value.data;
    return value;
};

export const getProfileAvatarUrl = (user: StrapiUser | null) => {
    const media = user ? getMedia(user.Avatar ?? null) : null;
    if (!media?.url) return "";

    const baseUrl = axiosInstance.defaults.baseURL || window.location.origin;
    return new URL(media.url, new URL(baseUrl, window.location.origin).origin)
        .toString();
};
