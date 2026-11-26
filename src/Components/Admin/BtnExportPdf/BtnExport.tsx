import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import MedicalReport from "./MedicalReport"; // استدعاء المكون الجديد الذي صممناه أعلى
import useDepartment from "../../../Features/department/useDepartment";

import { useFetchAlerts } from "../../../Features/requests/AdminRequests";

export default function BtnExport() {
    const { departments: departmentData } = useDepartment();

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
                occupancy: `${departmentData.icu?.ActiveBeds ?? 0} : ${departmentData.icu?.TotalBeds ?? 0}`,
                status: departmentData.icu?.Situation || "Unavailable",
            },
            {
                name: "Emergency",
                ratio: "1:4",
                occupancy: `${departmentData.emergency?.WaitingCount ?? 0} Waiting`,
                status: departmentData.emergency?.Situation || "Unavailable",
            },
            {
                name: "Med/Surg",
                ratio: "1:5",
                occupancy: `${departmentData.medSurg?.ActiveBeds ?? 0} : ${departmentData.medSurg?.TotalBeds ?? 0}`,
                status: departmentData.medSurg?.Situation || "Unavailable",
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
