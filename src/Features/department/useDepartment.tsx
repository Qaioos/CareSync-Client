import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import axios from "axios";
import useAuth from "../../Hook/authUser/useAuth";
import type { DepartmentOverview } from "./department.types";
import {
    createEmptyDepartmentOverview,
    normalizeDepartmentOverview,
} from "./department.utils";

const useDepartment = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [departments, setDepartments] = useState<DepartmentOverview>(
        createEmptyDepartmentOverview,
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        if (!auth?.accrssToken) {
            return;
        }
        let isMounted = true;
        const controller = new AbortController();

        const fetchAllDepartments = async () => {
            try {
                if (isMounted) setIsLoading(true);

                const [icuResponse, emergencyResponse, medSurgResponse] =
                    await Promise.all([
                        axiosPrivate.get<unknown>("/department-metrics", {
                            signal: controller.signal,
                        }),
                        axiosPrivate.get<unknown>(
                            "/department-emergencies",
                            { signal: controller.signal },
                        ),
                        axiosPrivate.get<unknown>("/department-med-surgs", {
                            signal: controller.signal,
                        }),
                    ]);
                if (isMounted) {
                    setDepartments(
                        normalizeDepartmentOverview({
                            icu: icuResponse.data,
                            emergency: emergencyResponse.data,
                            medSurg: medSurgResponse.data,
                        }),
                    );
                    setErr("");
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    if (error.name !== "CanceledError" && isMounted) {
                        console.error(error);

                        const serverMessage = error.response?.data?.message;
                        setErr(
                            serverMessage ||
                                error.message ||
                                "An error occurred while retrieving the data",
                        );
                    }
                } else if (isMounted) {
                    console.error("Unknown error:", error);
                    setErr(" An unexpected error occurred ");
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };
        fetchAllDepartments();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [auth?.accrssToken, axiosPrivate]);
    return { departments, isLoading, err };
};

export default useDepartment;
