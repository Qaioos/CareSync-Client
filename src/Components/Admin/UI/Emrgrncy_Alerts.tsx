import React, { useEffect, useRef, memo } from "react";
import { GiCancel } from "react-icons/gi";
import { IoWarning } from "react-icons/io5";
import toast from "react-hot-toast";

import { useFetchAlerts } from "../../../Features/requests/AdminRequests";
import { useAxiosPrivate } from "../../../Hook/RequestsWithToken/useAxiosPrivet";
import BtmToTop from "../../Ui/motion/BtmToTop";
import type {
    Requests,
    StrapiAlertPayload,
} from "../../../Types/api.responses";

const getAlertStyle = (situation?: string): string => {
    const normalizedSituation = situation?.toLowerCase().trim();
    switch (normalizedSituation) {
        case "critical":
        case "code blue":
            return "bg-error-container/50 border-error-container text-on-error-container";
        case "warning":
            return "bg-[#FEF3C7] border-[#FDE68A] text-[#B45309]";
        case "routine":
            return "bg-green-100 border-green-300 text-green-800";
        default:
            return "bg-gray-100 border-gray-300 text-gray-800";
    }
};

interface AlertCardProps {
    item: Requests;
    onCancel: (id: string | number) => void;
}

const AlertCard = memo(({ item, onCancel }: AlertCardProps) => {
    const uniqueKey = item.documentId || item.id;

    // التعامل مع الكائن كـ StrapiAlertPayload ممتد لقراءة الخصائص المحتملة بأمان
    const source =
        (item as unknown as StrapiAlertPayload).attributes ||
        (item as unknown as StrapiAlertPayload).data ||
        (item as unknown as StrapiAlertPayload);

    const rawDate =
        source.publishedAt ||
        source.createdAt ||
        source.published_at ||
        source.created_at;
    const alertTime = rawDate
        ? new Date(rawDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
          })
        : new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
          });

    const situation = source.Situation || source.situation || "Notice";
    const roomNumber =
        source.Room_Number ||
        source.room_number ||
        source.Room ||
        source.room ||
        "N/A";
    const requestType =
        source.RequestType || source.request_type || source.type || "Request";
    const details = source.Details || source.details || source.description;

    return (
        <BtmToTop key={uniqueKey}>
            <div
                className={`${getAlertStyle(situation)} border p-3 rounded-lg flex gap-4 items-start justify-between transition-all duration-200 hover:shadow-sm`}
            >
                <div className="flex gap-3 items-start">
                    <button
                        onClick={() => onCancel(uniqueKey)}
                        className="mt-0.5 text-gray-400 hover:text-red-600 transition-colors duration-150"
                        title="Dismiss Alert"
                        aria-label="Dismiss Alert"
                    >
                        <GiCancel className="text-lg" />
                    </button>

                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm tracking-wide">
                                {situation}
                            </span>
                            <span className="text-xs opacity-75">|</span>
                            <span className="text-sm font-medium">
                                {requestType} (Room {roomNumber})
                            </span>
                        </div>
                        {details && (
                            <p className="text-xs opacity-90 leading-relaxed mt-0.5">
                                {details}
                            </p>
                        )}
                    </div>
                </div>

                <span className="text-xs font-semibold opacity-75 whitespace-nowrap bg-white/40 px-2 py-0.5 rounded">
                    {alertTime}
                </span>
            </div>
        </BtmToTop>
    );
});

AlertCard.displayName = "AlertCard";

const Emrgrncy_Alerts: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();
    const { request, setRequests, isLodaing, err } = useFetchAlerts();

    const lastNotifiedId = useRef<string | number | null>(null);
    const isInitialLoad = useRef<boolean>(true);

    useEffect(() => {
        if (!isLodaing && request && request.length > 0) {
            const latestRequest = request[0];

            if (isInitialLoad.current) {
                lastNotifiedId.current = latestRequest.id;
                isInitialLoad.current = false;
                return;
            }

            if (latestRequest.id !== lastNotifiedId.current) {
                lastNotifiedId.current = latestRequest.id;

                const audio = new Audio(
                    "/public/Sounds/AlertAdmin/RequestForAdmin.mp3",
                );
                audio.play().catch((error: Error) => {
                    console.warn(
                        "Audio playback context requires user gesture first:",
                        error,
                    );
                });

                const toastSource =
                    (latestRequest as unknown as StrapiAlertPayload)
                        ?.attributes ||
                    (latestRequest as unknown as StrapiAlertPayload)?.data ||
                    (latestRequest as unknown as StrapiAlertPayload);

                const toastSituation =
                    toastSource?.Situation ||
                    toastSource?.situation ||
                    "Notice";
                const toastRoom =
                    toastSource?.Room_Number ||
                    toastSource?.room_number ||
                    toastSource?.Room ||
                    toastSource?.room ||
                    "N/A";
                const toastType =
                    toastSource?.RequestType ||
                    toastSource?.request_type ||
                    toastSource?.type ||
                    "Request";

                toast(
                    (t) => (
                        <div className="flex flex-col gap-1 p-1" role="alert">
                            <span className="font-bold text-error flex items-center gap-1">
                                ⚠️ New Alert: {toastSituation}
                            </span>
                            <p className="text-sm text-gray-700">
                                Room {toastRoom} - {toastType}
                            </p>
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="mt-2 text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded self-end font-medium transition-colors"
                            >
                                Dismiss
                            </button>
                        </div>
                    ),
                    { duration: 4000 },
                );
            }
        }
    }, [request, isLodaing]);

    if (isLodaing) {
        return (
            <div className="md:col-span-4 bg-white rounded-xl card-shadow p-6 flex items-center justify-center min-h-[200px]">
                <div className="text-sm font-medium text-gray-400 animate-pulse">
                    Loading Alerts...
                </div>
            </div>
        );
    }

    if (err) {
        return (
            <div className="md:col-span-4 bg-white rounded-xl card-shadow p-6 flex items-center justify-center min-h-[200px] border border-red-100">
                <div className="text-sm font-medium text-red-600">⚠️ {err}</div>
            </div>
        );
    }

    const handleCancel = async (targetId: string | number) => {
        if (!setRequests) return;

        setRequests((prev) =>
            prev.filter(
                (item) => item.documentId !== targetId && item.id !== targetId,
            ),
        );
        toast.success("Alert successfully dismissed.");

        try {
            await axiosPrivate.delete(`/requests/${targetId}`);
        } catch (error) {
            console.error("Failed to sync deletion with server:", error);
            toast.error("Network sync failed. Please reload the dashboard.");
        }
    };

    return (
        <div className="md:col-span-4 bg-white rounded-xl card-shadow p-6 flex flex-col gap-6 row-span-2">
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-3xl text-error">
                        <IoWarning />
                    </span>
                    Critical Alerts
                </h3>

                <div className="space-y-3 overflow-y-auto max-h-60 pr-1 scrollbar-thin">
                    {request && request.length > 0 ? (
                        request
                            .filter(
                                (item, index, self) =>
                                    self.findIndex(
                                        (r) =>
                                            (r.id && r.id === item.id) ||
                                            (r.documentId &&
                                                r.documentId ===
                                                    item.documentId),
                                    ) === index,
                            )
                            .map((item: Requests) => (
                                <AlertCard
                                    key={item.documentId || item.id}
                                    item={item}
                                    onCancel={handleCancel}
                                />
                            ))
                    ) : (
                        <div className="text-center py-6 text-sm text-gray-400 font-medium">
                            No active alerts at the moment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Emrgrncy_Alerts;
