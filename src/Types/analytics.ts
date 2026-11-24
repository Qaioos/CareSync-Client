export interface AnalyticsDepartment {
    name: string;
    activeBeds: number;
    totalBeds: number;
    waitingCount: number;
    situation: string;
}

export interface AnalyticsUser {
    id?: number;
    FullName?: string | null;
    username?: string;
    Department?: string | null;
    IsAvailabale?: boolean | null;
}

export interface AnalyticsShift {
    Department?: string;
    ShiftType?: string;
    StartTime: string;
    EndTime: string;
}

export interface AnalyticsRequest {
    RequestType?: string;
    Situation?: string;
    publishedAt?: string;
    createdAt?: string;
}
