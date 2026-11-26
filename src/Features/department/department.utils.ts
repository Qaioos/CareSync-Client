import type { StrapiUser } from "../../Types/api.responses";
import type {
    DepartmentKey,
    DepartmentOverview,
    DepartmentRecord,
} from "./department.types";

const EMPTY_DEPARTMENT_OVERVIEW: DepartmentOverview = {
    icu: null,
    emergency: null,
    medSurg: null,
};

const unwrapDepartmentRecord = (payload: unknown): DepartmentRecord | null => {
    if (Array.isArray(payload)) {
        return payload.length ? unwrapDepartmentRecord(payload[0]) : null;
    }

    if (typeof payload !== "object" || payload === null) return null;

    if ("data" in payload) {
        return unwrapDepartmentRecord(payload.data);
    }

    if ("attributes" in payload) {
        const { attributes, ...identity } = payload;
        if (typeof attributes === "object" && attributes !== null) {
            return { ...attributes, ...identity } as DepartmentRecord;
        }
    }

    return payload as DepartmentRecord;
};

export const normalizeDepartmentOverview = (
    responses: Record<DepartmentKey, unknown>,
): DepartmentOverview => ({
    icu: unwrapDepartmentRecord(responses.icu),
    emergency: unwrapDepartmentRecord(responses.emergency),
    medSurg: unwrapDepartmentRecord(responses.medSurg),
});

export const getDepartmentRecord = (
    overview: DepartmentOverview,
    key: DepartmentKey,
) => overview[key];

export const getDepartmentStaff = (
    users: StrapiUser[],
    departmentName: string,
) =>
    users
        .filter(
            (user) =>
                user.Department?.trim().toLowerCase() ===
                departmentName.toLowerCase(),
        )
        .sort((first, second) =>
            (first.FullName || first.username).localeCompare(
                second.FullName || second.username,
            ),
        );

export const getDepartmentDetailFields = (department: DepartmentRecord) =>
    Object.entries(department).map(([field, value]) => ({
        label: field
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/[_-]/g, " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase()),
        value: formatDepartmentValue(value),
    }));

const formatDepartmentValue = (value: unknown) => {
    if (value === null || value === undefined || value === "") {
        return "Not provided";
    }
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
};

export const getDepartmentStatusClassName = (situation?: string | null) => {
    if (!situation) return "bg-[#f1f5f4] text-[#718783]";
    return situation.toLowerCase().includes("high")
        ? "bg-[#fff4e5] text-[#b45309]"
        : "bg-[#eaf8ef] text-[#15803d]";
};

export const getDepartmentOccupancy = (department: DepartmentRecord) => {
    const activeBeds = Number(department.ActiveBeds || 0);
    const totalBeds = Number(department.TotalBeds || 0);
    return totalBeds > 0 ? Math.min((activeBeds / totalBeds) * 100, 100) : 0;
};

export const createEmptyDepartmentOverview = () => ({
    ...EMPTY_DEPARTMENT_OVERVIEW,
});
