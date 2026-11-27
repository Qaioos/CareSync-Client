import type { DepartmentRecord } from "../department/department.types";

export type ClinicalDepartmentKey = "icu" | "emergency" | "medSurg";
export type ClinicalDepartmentFields = Pick<
    DepartmentRecord,
    "ActiveBeds" | "TotalBeds" | "WaitingCount" | "Situation"
>;

export interface ClinicalDepartmentConfig {
    key: ClinicalDepartmentKey;
    name: string;
    endpoint: string;
    description: string;
}

export interface ClinicalDepartmentState {
    record: DepartmentRecord | null;
    isLoading: boolean;
    isSaving: boolean;
    error: string;
    saved: boolean;
}
