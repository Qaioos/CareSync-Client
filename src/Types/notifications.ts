export type NotificationSeverity = "Critical" | "Warning";
export type NotificationType = "Shift_Swap" | "Leave_Request";

export interface NotificationItem {
    id: number;
    documentId: string;
    Details?: string | null;
    RequestType: NotificationType | string;
    Room_Number?: number | null;
    Situation: NotificationSeverity | string;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}
