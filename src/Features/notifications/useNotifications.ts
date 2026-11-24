import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import type { NotificationItem } from "../../Types/notifications";
import { unwrapNotifications } from "../../Components/Admin/Notifications/notifications.utils";

export const useNotifications = () => {
    const axiosPrivate = useAxiosPrivate();
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const loadNotifications = async () => {
            try {
                setIsLoading(true);
                const response = await axiosPrivate.get(
                    "/requests?populate=Sender",
                    {
                        signal: controller.signal,
                    },
                );

                if (isMounted) {
                    setNotifications(unwrapNotifications(response.data));
                    setError("");
                }
            } catch (requestError) {
                const axiosError = requestError as AxiosError;
                if (isMounted && axiosError.name !== "CanceledError") {
                    setError("Unable to load notifications. Please try again.");
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadNotifications();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate]);

    return { notifications, isLoading, error };
};
