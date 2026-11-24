import type {
    AnalyticsDepartment,
    AnalyticsRequest,
    AnalyticsShift,
    AnalyticsUser,
} from "../../../Types/analytics";

export type PeriodFilter = "7" | "30" | "all";

export const unwrapArray = <T>(payload: unknown): T[] => {
    if (Array.isArray(payload)) return payload as T[];

    if (typeof payload === "object" && payload !== null) {
        const data = (payload as { data?: T[] }).data;
        if (Array.isArray(data)) return data;
    }

    return [];
};

export const filterRequestsByPeriod = (
    requests: AnalyticsRequest[],
    period: PeriodFilter,
) => {
    if (period === "all") return requests;

    const latestRequestTime = requests.reduce((latest, item) => {
        const date = new Date(
            item.publishedAt || item.createdAt || "",
        ).getTime();
        return Number.isFinite(date) ? Math.max(latest, date) : latest;
    }, 0);

    if (latestRequestTime === 0) return [];

    const periodDays = Number(period);
    const cutoff = latestRequestTime - periodDays * 24 * 60 * 60 * 1000;

    return requests.filter((item) => {
        const date = new Date(
            item.publishedAt || item.createdAt || "",
        ).getTime();
        return Number.isFinite(date) && date >= cutoff;
    });
};

export const getAnalyticsMetrics = (
    users: AnalyticsUser[],
    shifts: AnalyticsShift[],
    requests: AnalyticsRequest[],
    departments: AnalyticsDepartment[],
) => {
    const availableStaff = users.filter(
        (user) => user.IsAvailabale === true,
    ).length;
    const activeBeds = departments.reduce(
        (total, department) => total + department.activeBeds,
        0,
    );
    const waitingPatients = departments.reduce(
        (total, department) => total + department.waitingCount,
        0,
    );
    const criticalAlerts = requests.filter(
        (request) => request.Situation === "Critical",
    ).length;

    const shiftDistribution = [
        {
            name: "Day",
            value: shifts.filter((shift) => shift.ShiftType === "Day").length,
        },
        {
            name: "Evening",
            value: shifts.filter((shift) => shift.ShiftType === "Evening")
                .length,
        },
        {
            name: "Night",
            value: shifts.filter((shift) => shift.ShiftType === "Night").length,
        },
    ];

    const requestTypes = [
        {
            name: "Leave requests",
            value: requests.filter(
                (request) => request.RequestType === "Leave_Request",
            ).length,
        },
        {
            name: "Shift swaps",
            value: requests.filter(
                (request) => request.RequestType === "Shift_Swap",
            ).length,
        },
    ];

    return {
        availableStaff,
        activeBeds,
        waitingPatients,
        criticalAlerts,
        shiftDistribution,
        requestTypes,
    };
};
