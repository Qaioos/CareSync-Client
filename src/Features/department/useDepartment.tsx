import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import axios from "axios";
import useAuth from "../../Hook/authUser/useAuth";

const useDepartment = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [request, setRequests] = useState({
        departmenticu: {},
        departmentmAG_Sug: {},
        departmenticu_Emrg: {},
    });
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

                const [icuRes, magSugRes, emrgRes] = await Promise.all([
                    axiosPrivate.get("/department-metrics", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get("/department-med-surgs", {
                        signal: controller.signal,
                    }),
                    axiosPrivate.get("/department-emergencies", {
                        signal: controller.signal,
                    }),
                ]);
                if (isMounted) {
                    setRequests({
                        departmenticu: icuRes.data,
                        departmentmAG_Sug: magSugRes.data,
                        departmenticu_Emrg: emrgRes.data,
                    });
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
    return { request, isLoading, err };
};

export default useDepartment;
