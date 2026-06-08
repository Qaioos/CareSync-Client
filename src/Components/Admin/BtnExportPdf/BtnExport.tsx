import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import MedicalReport from "./MedicalReport"; // استدعاء المكون الجديد الذي صممناه أعلى
import useDepartment from "../../../Features/department/useDepartment";
import type { Requests } from "../../../Types/api.responses";

import { useFetchAlerts } from "../../../Features/requests/AdminRequests";

export default function BtnExport() {
    // useDepartment Temporary fix. Backend API is incorrectly returning an Array instead of an Object.
    // Handling it as an array for now until the backend team resolves the issue.

    const { request: departmentData } = useDepartment();
    const { departmenticu, departmentmAG_Sug, departmenticu_Emrg } =
        departmentData as Requests;

    const { request: alertsArray } = useFetchAlerts();

    const reportRef = useRef(null);

    // هيكلة البيانات القادمة ديناميكياً من نظام Strapi الخاص بك أو الـ API المتصل بالواجهة
    const reportData = {
        efficiency: 82, // مأخوذ من دائرة الـ 82% في صورتك
        totalPatients: 95,
        departments: [
            {
                name: "ICU",
                ratio: "1:2",
                occupancy: `${departmenticu?.data?.[0].ActiveBeds} : ${departmenticu?.data?.[0].TotalBeds}`,
                status: `${departmenticu?.data?.[0].Situation}`,
            },
            {
                name: "Emergency",
                ratio: "1:4",
                occupancy: `${departmenticu_Emrg.data?.[0].WaitingCount} WaitingCount`,
                status: `${departmenticu_Emrg?.data?.[0]?.Situation}`,
            },
            {
                name: "Med/Surg",
                ratio: "1:5",
                occupancy: `${departmentmAG_Sug?.data?.[0].ActiveBeds} : ${departmentmAG_Sug?.data?.[0].TotalBeds}`,
                status: `${departmentmAG_Sug?.data?.[0].Situation}`,
            },
        ],
        alerts: Array.isArray(alertsArray) ? alertsArray : [],
    };

    const handlePrint = useReactToPrint({
        contentRef: reportRef,
        documentTitle: `CareSync_Supervisor_Report_${new Date().toISOString().slice(0, 10)}`,
    });

    return (
            <button
            onClick={handlePrint}
                className=" px-4 py-2 cursor-pointer border-[1.5px] border-primary text-primary material-symbols-outlined  text-label-lg rounded-lg hover:bg-primary/5 transition-colors"
            >
                Export Report
            <MedicalReport ref={reportRef} data={reportData} />
            </button>

    );
}
