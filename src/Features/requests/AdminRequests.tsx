import { useEffect, useState } from "react";
import useAuth from "../../Hook/authUser/useAuth";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import type { Requests, StrapiAlertPayload, StrapiSocketResponse } from "../../Types/api.responses";
import type { AxiosError } from "axios";
import { io, Socket } from "socket.io-client";

const STRAPI_URL = import.meta.env.VITE_API_URL; 

export const useFetchAlerts = () => {
    const axiosPrivate = useAxiosPrivate();
    const [request, setRequests] = useState<Requests[]>([]);
    const [isLodaing, setisLodaing] = useState<boolean>(true);
    const [err, setErr] = useState<string>('');
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        let socket: Socket | null = null;

        const getRequests = async () => {
            const token = auth?.accrssToken;
            if (!token) return;

            try {
                const response = await axiosPrivate.get('/requests', {
                    signal: controller.signal,
                });
                if (isMounted) {
                    // الـ API يرجع إما مصفوفة مباشرة أو مصفوفة داخل data.data
                    const cleanData = response?.data?.data || response?.data;
                    setRequests((cleanData as Requests[]) || []);
                    setisLodaing(false);
                }
            } catch (err: unknown) {
                const error = err as AxiosError; 
                if (isMounted && error?.name !== "CanceledError") {
                    setErr('Failed to get Response');
                    setisLodaing(false);
                }
            } finally {
                if (isMounted) setisLodaing(false);
            }
        };

        getRequests();

        socket = io(STRAPI_URL, {
            transports: ["websocket"],
            auth: { token: auth?.accrssToken }
        });

        socket.on("connect", () => {
            console.log("✅ تم الاتصال بـ WebSocket بنجاح! ID:", socket?.id);
        });

        const handleNewRequest = (data: StrapiSocketResponse) => {
            console.log("⚡ كائن السوكيت المستلم الفعلي:", data);
            if (!data || !isMounted) return;

            // استخراج حاوية البيانات الفرعية المتاحة
            const payload: StrapiAlertPayload = data.entry || data.result || data.data || data.attributes || data;

            // دالة البحث الديناميكي الآمنة مع تحديد نوع الكائن المدخل
            const extractValue = (targetObj: StrapiAlertPayload | undefined, fieldKeys: string[]): any => {
                if (!targetObj) return undefined;
                
                const searchPool = [targetObj, targetObj.attributes].filter((p): p is StrapiAlertPayload => !!p);
                
                for (const pool of searchPool) {
                    const record = pool as Record<string, any>;
                    for (const key of fieldKeys) {
                        if (record[key] !== undefined) return record[key];
                        
                        const lowerKey = key.toLowerCase();
                        if (record[lowerKey] !== undefined) return record[lowerKey];
                        
                        const dynamicKey = Object.keys(record).find(k => k.toLowerCase() === lowerKey);
                        if (dynamicKey && record[dynamicKey] !== undefined) return record[dynamicKey];
                    }
                }
                return undefined;
            };

            const rawId = payload.id || data.id || extractValue(payload, ["id"]);
            if (!rawId) {
                console.warn("⚠️ تم استقبال حدث سوكيت ولكن بدون ID فريد:", data);
                return; 
            }

            const formattedRequest: Requests = {
                id: Number(rawId),
                documentId: extractValue(payload, ["documentId", "documentid"]),
                Details: extractValue(payload, ["Details", "details", "description"]),
                RequestType: extractValue(payload, ["RequestType", "requestType", "request_type", "type"]),
                Room_Number: extractValue(payload, ["Room_Number", "room_number", "Room", "room"]),
                Situation: extractValue(payload, ["Situation", "situation"]),
                createdAt: extractValue(payload, ["createdAt", "created_at"]),
                publishedAt: extractValue(payload, ["publishedAt", "published_at"]) || new Date().toISOString(),
                updatedAt: extractValue(payload, ["updatedAt", "updated_at"])
            };

            setRequests((prevRequests) => {
                const exists = prevRequests.some(req => 
                    req.id === formattedRequest.id || 
                    (formattedRequest.documentId && req.documentId === formattedRequest.documentId)
                );
                if (exists) return prevRequests; 
                return [formattedRequest, ...prevRequests]; 
            });
        };

        const handleDeletedRequest = (data: StrapiSocketResponse) => {
            const payload: StrapiAlertPayload | undefined = data?.entry || data?.result || data?.data;
            const id = payload?.id || data?.id;
            if (id && isMounted) {
                setRequests((prevRequests) => prevRequests.filter(req => req.id !== Number(id) && req.documentId !== id));
            }
        };

        socket.on("api::request.request.create", handleNewRequest);
        socket.on("request.create", handleNewRequest);
        socket.on("request:create", handleNewRequest);
        socket.on("create", handleNewRequest);

        socket.on("api::request.request.delete", handleDeletedRequest);
        socket.on("request.delete", handleDeletedRequest);

        socket.onAny((eventName: string, data: any) => {
            console.log(`🔍 كاشف السوكيت رصد حدثاً باسم [${eventName}]`, data);
        });

        return () => {
            isMounted = false;
            controller.abort();
            if (socket) {
                socket.disconnect();
            }
        };
    }, [auth?.accrssToken, axiosPrivate]);

    return { request, setRequests, isLodaing, err }; 
};
