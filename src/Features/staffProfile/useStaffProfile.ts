import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import type { StrapiUser } from "../../Types/api.responses";
import type { Shift } from "../../Types/scheduling";
import type { StaffProfileFormData } from "./staffProfile.types";
import {
    createStaffProfileFormData,
    createStaffUpdatePayload,
    getArrayFromResponse,
    getStaffFromResponse,
    getStaffProfileRequestError,
    getStaffProfileValidationError,
    isCanceledRequest,
    isValidStaffId,
} from "./staffProfile.utils";

export const useStaffProfile = (userId?: string) => {
    const axiosPrivate = useAxiosPrivate();
    const hasValidUserId = isValidStaffId(userId);
    const [member, setMember] = useState<StrapiUser | null>(null);
    const [formData, setFormData] = useState<StaffProfileFormData | null>(null);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [shiftError, setShiftError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const loadProfile = async () => {
            setIsLoading(true);
            setError("");

            try {
                const profileResponse = await axiosPrivate.get<unknown>(
                    `/users/${userId}?populate=role`,
                    { signal: controller.signal },
                );
                const user = getStaffFromResponse(profileResponse.data);
                if (!user) {
                    throw new Error(
                        "The server returned an invalid staff profile.",
                    );
                }

                if (isMounted) {
                    setMember(user);
                    setFormData(createStaffProfileFormData(user));
                }

                try {
                    const shiftsResponse = await axiosPrivate.get<unknown>(
                        "/shifts?populate=AssignedStaff",
                        { signal: controller.signal },
                    );
                    if (isMounted) {
                        setShifts(getArrayFromResponse<Shift>(shiftsResponse.data));
                        setShiftError("");
                    }
                } catch (requestError) {
                    if (isMounted && !isCanceledRequest(requestError)) {
                        setShiftError(
                            "Could not load this staff member's schedule.",
                        );
                    }
                }
            } catch (requestError) {
                if (isMounted && !isCanceledRequest(requestError)) {
                    setError(
                        getStaffProfileRequestError(
                            requestError,
                            "Unable to load this staff profile.",
                        ),
                    );
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        if (hasValidUserId) void loadProfile();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate, hasValidUserId, userId]);

    const updateFormField = <K extends keyof StaffProfileFormData>(
        field: K,
        value: StaffProfileFormData[K],
    ) => {
        setFormData((current) =>
            current ? { ...current, [field]: value } : current,
        );
        setError("");
    };

    const saveProfile = async () => {
        if (!member || !formData) return false;

        const validationError = getStaffProfileValidationError(formData);
        if (validationError) {
            setError(validationError);
            return false;
        }

        setIsSaving(true);
        setError("");
        try {
            const updates = createStaffUpdatePayload(formData);
            const response = await axiosPrivate.put<unknown>(
                `/users/${member.id}`,
                updates,
            );
            const responseMember = getStaffFromResponse(response.data);
            const updatedMember = {
                ...member,
                ...updates,
                ...responseMember,
            };
            setMember(updatedMember);
            setFormData(createStaffProfileFormData(updatedMember));
            toast.success("Staff profile updated successfully.");
            return true;
        } catch (requestError) {
            setError(
                getStaffProfileRequestError(
                    requestError,
                    "Could not update this staff profile. Please try again.",
                ),
            );
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return {
        member,
        formData,
        shifts,
        isLoading,
        isSaving,
        error,
        shiftError,
        hasValidUserId,
        saveProfile,
        updateFormField,
    };
};
