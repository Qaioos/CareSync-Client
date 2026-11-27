import type { ClinicalDepartmentConfig } from "./settings.types";

export const CLINICAL_DEPARTMENTS: ClinicalDepartmentConfig[] = [
    {
        key: "icu",
        name: "ICU",
        endpoint: "/department-metrics",
        description: "Intensive care capacity and patient flow.",
    },
    {
        key: "emergency",
        name: "Emergency",
        endpoint: "/department-emergencies",
        description: "Emergency unit capacity and waiting patients.",
    },
    {
        key: "medSurg",
        name: "Med/Surg",
        endpoint: "/department-med-surgs",
        description: "Medical-surgical capacity and patient flow.",
    },
];
