import { MdSwapHoriz, MdEventBusy, MdNotifications } from "react-icons/md";
import type { NotificationItem } from "../../../Types/notifications";
import {
    formatNotificationTime,
    getNotificationTitle,
} from "./notifications.utils";

interface NotificationCardProps {
    notification: NotificationItem;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
    const isCritical = notification.Situation === "Critical";
    const icon =
        notification.RequestType === "Shift_Swap" ? (
            <MdSwapHoriz aria-hidden="true" />
        ) : notification.RequestType === "Leave_Request" ? (
            <MdEventBusy aria-hidden="true" />
        ) : (
            <MdNotifications aria-hidden="true" />
        );

    return (
        <article className="group flex flex-col gap-4 border-b border-[#edf3f1] px-5 py-5 transition last:border-b-0 hover:bg-[#f8fcfb] md:flex-row md:items-center">
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${isCritical ? "bg-[#fff0ed] text-[#b42318]" : "bg-[#fff6df] text-[#b45309]"}`}
            >
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-[#163432]">
                        {getNotificationTitle(notification)}
                    </h3>
                    <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${isCritical ? "bg-[#fff0ed] text-[#b42318]" : "bg-[#fff6df] text-[#b45309]"}`}
                    >
                        {notification.Situation || "Warning"}
                    </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#607774]">
                    {notification.Details || "No additional details provided."}
                </p>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-4 md:min-w-36 md:flex-col md:items-end md:justify-center">
                {notification.Room_Number ? (
                    <span className="rounded-lg bg-[#edf7f5] px-2.5 py-1 text-xs font-bold text-primary-container">
                        Room {notification.Room_Number}
                    </span>
                ) : (
                    <span />
                )}
                <time className="text-xs font-semibold text-[#91a5a2]">
                    {formatNotificationTime(notification)}
                </time>
            </div>
        </article>
    );
};

export default NotificationCard;
