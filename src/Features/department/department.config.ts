import type { DepartmentConfig, DepartmentKey } from "./department.types";

export const DEPARTMENTS: DepartmentConfig[] = [
    {
        key: "icu",
        name: "ICU",
        staffDepartment: "ICU",
        nurseRatio: "1:2",
        accent: "#14B8A6",
    },
    {
        key: "emergency",
        name: "Emergency",
        staffDepartment: "Emergency",
        nurseRatio: "1:4",
        accent: "#F59E0B",
    },
    {
        key: "medSurg",
        name: "Med/Surg",
        staffDepartment: "Med/Surg",
        nurseRatio: "1:5",
        accent: "#10B981",
    },
];

export const getDepartmentConfig = (key: string) =>
    DEPARTMENTS.find((department) => department.key === key);

export const getDepartmentKey = (
    key: string,
): DepartmentKey | undefined => getDepartmentConfig(key)?.key;
