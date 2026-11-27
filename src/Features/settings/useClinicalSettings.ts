import { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import {
    normalizeDepartmentOverview,
} from "../department/department.utils";
import { CLINICAL_DEPARTMENTS } from "./settings.config";
import type {
    ClinicalDepartmentFields,
    ClinicalDepartmentKey,
    ClinicalDepartmentState,
} from "./settings.types";

const createInitialState = (): Record<
    ClinicalDepartmentKey,
    ClinicalDepartmentState
> => ({
    icu: { record: null, isLoading: true, isSaving: false, error: "", saved: false },
    emergency: {
        record: null,
        isLoading: true,
        isSaving: false,
        error: "",
        saved: false,
    },
    medSurg: {
        record: null,
        isLoading: true,
        isSaving: false,
        error: "",
        saved: false,
    },
});

const getRequestError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
            error?: { message?: string };
            message?: string;
        }>;
        return (
            axiosError.response?.data?.error?.message ||
            axiosError.response?.data?.message ||
            axiosError.message
        );
    }

    return error instanceof Error ? error.message : "An unexpected error occurred.";
};

const useClinicalSettings = () => {
    const axiosPrivate = useAxiosPrivate();
    const [departments, setDepartments] = useState(createInitialState);

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const loadDepartment = async (
            key: ClinicalDepartmentKey,
            endpoint: string,
        ) => {
            try {
                const response = await axiosPrivate.get<unknown>(endpoint, {
                    signal: controller.signal,
                });
                if (!isMounted) return;

                const overview = normalizeDepartmentOverview({
                    icu: key === "icu" ? response.data : null,
                    emergency: key === "emergency" ? response.data : null,
                    medSurg: key === "medSurg" ? response.data : null,
                });
                setDepartments((current) => ({
                    ...current,
                    [key]: {
                        ...current[key],
                        record: overview[key],
                        isLoading: false,
                        error: "",
                    },
                }));
            } catch (error) {
                if (
                    !isMounted ||
                    (axios.isAxiosError(error) &&
                        (error.code === "ERR_CANCELED" ||
                            error.name === "CanceledError"))
                ) {
                    return;
                }

                setDepartments((current) => ({
                    ...current,
                    [key]: {
                        ...current[key],
                        isLoading: false,
                        error: getRequestError(error),
                    },
                }));
            }
        };

        void Promise.all(
            CLINICAL_DEPARTMENTS.map(({ key, endpoint }) =>
                loadDepartment(key, endpoint),
            ),
        );

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate]);

    const updateDepartment = (
        key: ClinicalDepartmentKey,
        field: keyof ClinicalDepartmentFields,
        value: number | string,
    ) => {
        setDepartments((current) => {
            const department = current[key];
            const record = department.record || {
                ActiveBeds: 0,
                TotalBeds: 0,
                WaitingCount: 0,
                Situation: "Normal",
            };

            return {
                ...current,
                [key]: {
                    ...department,
                    saved: false,
                    error: "",
                    record: { ...record, [field]: value },
                },
            };
        });
    };

    const saveDepartment = async (key: ClinicalDepartmentKey) => {
        const department = departments[key];
        if (!department.record) return false;

        const activeBeds = Number(department.record.ActiveBeds);
        const totalBeds = Number(department.record.TotalBeds);
        const waitingCount = Number(department.record.WaitingCount);
        if (
            !Number.isFinite(activeBeds) ||
            !Number.isFinite(totalBeds) ||
            !Number.isFinite(waitingCount) ||
            activeBeds < 0 ||
            totalBeds < 0 ||
            waitingCount < 0 ||
            activeBeds > totalBeds
        ) {
            setDepartments((current) => ({
                ...current,
                [key]: {
                    ...current[key],
                    error: "Enter valid non-negative values; active beds cannot exceed total beds.",
                },
            }));
            return false;
        }

        const config = CLINICAL_DEPARTMENTS.find(
            (departmentConfig) => departmentConfig.key === key,
        );
        if (!config) return false;

        const fields: ClinicalDepartmentFields = {
            ActiveBeds: activeBeds,
            TotalBeds: totalBeds,
            WaitingCount: waitingCount,
            Situation: department.record.Situation || "Normal",
        };
        const recordId =
            department.record.documentId ?? department.record.id;

        setDepartments((current) => ({
            ...current,
            [key]: { ...current[key], isSaving: true, error: "", saved: false },
        }));

        try {
            const response = recordId
                ? await axiosPrivate.put<unknown>(
                      `${config.endpoint}/${recordId}`,
                      { data: fields },
                  )
                : await axiosPrivate.post<unknown>(config.endpoint, {
                      data: fields,
                  });
            const updatedOverview = normalizeDepartmentOverview({
                icu: key === "icu" ? response.data : null,
                emergency: key === "emergency" ? response.data : null,
                medSurg: key === "medSurg" ? response.data : null,
            });
            setDepartments((current) => ({
                ...current,
                [key]: {
                    ...current[key],
                    record: updatedOverview[key] || {
                        ...department.record,
                        ...fields,
                    },
                    isSaving: false,
                    saved: true,
                },
            }));
            return true;
        } catch (error) {
            setDepartments((current) => ({
                ...current,
                [key]: {
                    ...current[key],
                    isSaving: false,
                    error: getRequestError(error),
                },
            }));
            return false;
        }
    };

    return { departments, updateDepartment, saveDepartment };
};

export default useClinicalSettings;
