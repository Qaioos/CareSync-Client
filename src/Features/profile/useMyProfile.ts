import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import useAuth from "../../Hook/authUser/useAuth";
import type { StrapiUser } from "../../Types/api.responses";
import type { ProfileEditData } from "../../Types/profile";
import { createProfileEditData } from "./profile.utils";

const getProfileResponse = (payload: unknown): StrapiUser | null => {
    if (typeof payload !== "object" || payload === null) return null;

    const data = "data" in payload ? payload.data : payload;
    return typeof data === "object" && data !== null
        ? (data as StrapiUser)
        : null;
};

export const useMyProfile = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth, setAuth } = useAuth();
    const [profile, setProfile] = useState<StrapiUser | null>(auth.user);
    const [editData, setEditData] = useState<ProfileEditData | null>(
        auth.user ? createProfileEditData(auth.user) : null,
    );
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const loadProfile = async () => {
            try {
                const response = await axiosPrivate.get(
                    "/users/me?populate=role",
                    { signal: controller.signal },
                );
                const user = getProfileResponse(response.data);

                if (isMounted && user?.id) {
                    setProfile(user);
                    setEditData(createProfileEditData(user));
                    setAuth((current) => ({
                        ...current,
                        user,
                        username: user.username,
                        rols: user.role?.name || current.rols,
                    }));
                    setLoadError("");
                }
            } catch (requestError) {
                const axiosError = requestError as AxiosError;
                if (isMounted && axiosError.name !== "CanceledError") {
                    setLoadError(
                        "Could not refresh profile data. Showing the saved account details instead.",
                    );
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadProfile();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate, setAuth]);

    const updateFullName = (FullName: string) => {
        setEditData({ FullName });
        setError("");
    };

    const saveProfile = async () => {
        if (!profile || !editData) return false;

        setError("");
        setIsSaving(true);

        const profileUpdates = { FullName: editData.FullName.trim() };

        try {
            const response = await axiosPrivate.put(
                `/users/${profile.id}`,
                profileUpdates,
            );
            const updatedFields = getProfileResponse(response.data);
            const updatedProfile = {
                ...profile,
                ...profileUpdates,
                ...updatedFields,
            } as StrapiUser;

            setProfile(updatedProfile);
            setEditData(createProfileEditData(updatedProfile));
            setAuth((current) => ({
                ...current,
                user: updatedProfile,
            }));
            return true;
        } catch (requestError) {
            const axiosError = requestError as AxiosError<{
                error?: { message?: string };
                message?: string;
            }>;
            setError(
                axiosError.response?.data?.error?.message ||
                    axiosError.response?.data?.message ||
                    "Could not update your profile. Please try again.",
            );
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return {
        profile,
        editData,
        isLoading,
        isSaving,
        error,
        loadError,
        updateFullName,
        saveProfile,
    };
};
