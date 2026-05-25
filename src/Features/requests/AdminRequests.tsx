import { useEffect, useState } from "react";
import useAuth from "../../Hook/authUser/useAuth";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import type { Requests } from "../../Types/api.responses";
import type { AxiosError } from "axios";

export const useFetchAlerts = () => {
    const axiosPrivate = useAxiosPrivate();
    const [request, setRequests] = useState<Requests[]>([]);
    const [isLodaing, setisLodaing] = useState(true);
    const [err, setErr] = useState('');
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getRequests = async () => {
            const token = auth?.accrssToken || auth?.accrssToken;
            if (!token) return;

            try {
                const response = await axiosPrivate.get('/requests', {
                    signal: controller.signal,
                });
                
                
                if (isMounted) {
                    // Strapi يضع المصفوفة عادة داخل response.data.data
                    const cleanData = response?.data?.data || response?.data;
                    setRequests(cleanData || []);
                    setisLodaing(false);
                }
            } catch (err: unknown) {
                const error = err as AxiosError; 
                if (isMounted && error?.name !== "CanceledError") {
                    setErr('Failed to get Response');
                    setisLodaing(false);
                }
                console.log(error);
            } finally {
                if (isMounted) {
                    setisLodaing(false);
                    console.log("🏁 تم إيقاف حالة التحميل في الـ Hook");
                }
            }
        };

        getRequests();

        const interval :number = setInterval(() => {
        getRequests();
    }, 3000);

        return () => {
            isMounted = false;
            controller.abort();
            clearInterval(interval)
        };
    }, [auth?.accrssToken,axiosPrivate]); // يعمل عند توفر التوكن أو تغيره

    // نُصدر الحالات والمصفوفة فقط لملف الـ UI
    return { request, isLodaing, err };
};
