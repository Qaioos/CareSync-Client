import { useEffect, useState } from "react";
import axios from "axios";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import type { StrapiUser } from "../../Types/api.responses";
import type { DepartmentKey } from "./department.types";
import { getDepartmentStaff } from "./department.utils";
import { DEPARTMENTS } from "./department.config";
import useDepartment from "./useDepartment";

const getUsersFromResponse = (payload: unknown): StrapiUser[] => {
    if (Array.isArray(payload)) return payload as StrapiUser[];
    if (
        typeof payload === "object" &&
        payload !== null &&
        "data" in payload &&
        Array.isArray(payload.data)
    ) {
        return payload.data as StrapiUser[];
    }
    return [];
};

const useDepartmentDetails = (departmentKey: DepartmentKey) => {
    const axiosPrivate = useAxiosPrivate();
    const {
        departments,
        isLoading: isLoadingDepartment,
        err: departmentError,
    } = useDepartment();
    const [users, setUsers] = useState<StrapiUser[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [usersError, setUsersError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const loadUsers = async () => {
            setIsLoadingUsers(true);
            try {
                const response = await axiosPrivate.get<unknown>(
                    "/users?populate=role",
                    { signal: controller.signal },
                );
                if (isMounted) {
                    setUsers(getUsersFromResponse(response.data));
                    setUsersError("");
                }
            } catch (requestError) {
                if (isMounted && axios.isAxiosError(requestError)) {
                    if (
                        requestError.code === "ERR_CANCELED" ||
                        requestError.name === "CanceledError"
                    ) {
                        return;
                    }
                    setUsersError(
                        requestError.response?.data?.message ||
                            "Could not load department staff.",
                    );
                } else if (isMounted) {
                    setUsersError("Could not load department staff.");
                }
            } finally {
                if (isMounted) setIsLoadingUsers(false);
            }
        };

        void loadUsers();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate, departmentKey]);

    const staffDepartment =
        DEPARTMENTS.find((config) => config.key === departmentKey)
            ?.staffDepartment || departmentKey;

    return {
        department: departments[departmentKey],
        staff: getDepartmentStaff(users, staffDepartment),
        isLoadingDepartment,
        isLoadingUsers,
        departmentError,
        usersError,
    };
};

export default useDepartmentDetails;
