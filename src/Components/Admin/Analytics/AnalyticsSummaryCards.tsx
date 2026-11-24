import {
    MdGroups,
    MdLocalHospital,
    MdNotifications,
    MdWarning,
} from "react-icons/md";
import SummaryCard from "../Shared/SummaryCard";

interface AnalyticsSummaryCardsProps {
    availableStaff: number;
    activeBeds: number;
    activeRequests: number;
    criticalAlerts: number;
}

const AnalyticsSummaryCards = ({
    availableStaff,
    activeBeds,
    activeRequests,
    criticalAlerts,
}: AnalyticsSummaryCardsProps) => (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
            icon={<MdGroups />}
            label="Available staff"
            value={availableStaff}
            tone="green"
        />
        <SummaryCard
            icon={<MdLocalHospital />}
            label="Active beds"
            value={activeBeds}
            tone="teal"
        />
        <SummaryCard
            icon={<MdNotifications />}
            label="Active requests"
            value={activeRequests}
            tone="amber"
        />
        <SummaryCard
            icon={<MdWarning />}
            label="Critical alerts"
            value={criticalAlerts}
            tone="amber"
        />
    </div>
);

export default AnalyticsSummaryCards;
