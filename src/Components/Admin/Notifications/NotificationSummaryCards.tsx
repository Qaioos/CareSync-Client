import { MdWarning, MdSwapHoriz, MdEventBusy } from "react-icons/md";
import SummaryCard from "../Shared/SummaryCard";
import type { NotificationItem } from "../../../Types/notifications";

interface NotificationSummaryCardsProps {
    notifications: NotificationItem[];
}

const NotificationSummaryCards = ({
    notifications,
}: NotificationSummaryCardsProps) => {
    const criticalCount = notifications.filter(
        (item) => item.Situation === "Critical",
    ).length;
    const swapCount = notifications.filter(
        (item) => item.RequestType === "Shift_Swap",
    ).length;
    const leaveCount = notifications.filter(
        (item) => item.RequestType === "Leave_Request",
    ).length;

    return (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryCard
                icon={<MdWarning />}
                label="Critical"
                value={criticalCount}
                tone="amber"
            />
            <SummaryCard
                icon={<MdSwapHoriz />}
                label="Shift swaps"
                value={swapCount}
                tone="teal"
            />
            <SummaryCard
                icon={<MdEventBusy />}
                label="Leave requests"
                value={leaveCount}
                tone="green"
            />
        </div>
    );
};

export default NotificationSummaryCards;
