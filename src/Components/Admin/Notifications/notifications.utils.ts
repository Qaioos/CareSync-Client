import type { NotificationItem } from "../../../Types/notifications";

export type NotificationSeverityFilter = "all" | "Critical" | "Warning";
export type NotificationTypeFilter = "all" | "Shift_Swap" | "Leave_Request";

export const unwrapNotifications = (payload: unknown): NotificationItem[] => {
    if (Array.isArray(payload)) return payload as NotificationItem[];

    if (typeof payload === "object" && payload !== null) {
        const data = (payload as { data?: NotificationItem[] }).data;
        if (Array.isArray(data)) return data;
    }

    return [];
};

export const getNotificationTitle = (item: NotificationItem) => {
    if (item.RequestType === "Shift_Swap") return "Shift swap request";
    if (item.RequestType === "Leave_Request") return "Leave request";
    return "Hospital request";
};

export const formatNotificationTime = (item: NotificationItem) => {
    const timestamp = item.publishedAt || item.createdAt;
    const date = new Date(timestamp);

    if (!Number.isFinite(date.getTime())) return "Recently";

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
};
