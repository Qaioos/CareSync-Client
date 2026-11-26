import type { StrapiUser } from "../../Types/api.responses";

export type DepartmentKey = "icu" | "emergency" | "medSurg";

export interface DepartmentRecord {
    id?: number;
    documentId?: string;
    ActiveBeds?: number;
    TotalBeds?: number;
    WaitingCount?: number;
    Situation?: string | null;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    [field: string]: unknown;
}

export interface DepartmentOverview {
    icu: DepartmentRecord | null;
    emergency: DepartmentRecord | null;
    medSurg: DepartmentRecord | null;
}

export interface DepartmentConfig {
    key: DepartmentKey;
    name: string;
    staffDepartment: string;
    nurseRatio: string;
    accent: string;
}

export type DepartmentStaffMember = StrapiUser;
