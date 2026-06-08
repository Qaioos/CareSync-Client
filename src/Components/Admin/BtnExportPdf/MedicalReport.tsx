import React from "react";
import type { Requests } from "../../../Types/api.responses";

interface DepartmentReport {
    name: string;
    ratio: string;
    occupancy: string;
    status: string;
}

interface MedicalReportProps {
    data: {
        efficiency: number;
        totalPatients: number;
        departments: DepartmentReport[];
        alerts: Requests[];
    };
}

const MedicalReport = React.forwardRef<HTMLDivElement, MedicalReportProps>(
    ({ data }, ref) => {
        const currentDate = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        return (
            /* Container is hidden on standard display and visible only for print */
            <div
                ref={ref}
                className="hidden print:block print:p-10 bg-white text-gray-800 font-sans w-full"
                dir="ltr"
            >
                {/* Official Report Header */}
                <div className="flex justify-between items-center pb-6 border-b-2 border-blue-600 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                            🏥 CareSync Medical System
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Comprehensive Administrative & Operational Report
                        </p>
                    </div>
                    <div className="text-right text-sm text-gray-600 space-y-1">
                        <p>
                            <strong>Report Date:</strong> {currentDate}
                        </p>
                        <p>
                            <strong>Document Type:</strong> Performance &
                            Capacity Review
                        </p>
                    </div>
                </div>

                {/* Section 1: Overview (Digital Summary) */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-700 border-b border-gray-200 pb-2 mb-4">
                        📊 Operational Summary Metrics
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                            <span className="block text-sm text-gray-500">
                                Staffing Efficiency
                            </span>
                            <span className="text-xl font-bold text-blue-600">
                                {data.efficiency}%
                            </span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                            <span className="block text-sm text-gray-500">
                                Total Active Patients
                            </span>
                            <span className="text-xl font-bold text-blue-600">
                                {data.totalPatients}
                            </span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                            <span className="block text-sm text-gray-500">
                                Active Critical Alerts
                            </span>
                            <span className="text-xl font-bold text-red-600">
                                {data.alerts.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Section 2: Department Metrics (ICU / Emergency / Med-Surg) */}
                <div className="mb-8 print:break-inside-avoid">
                    <h3 className="text-lg font-bold text-gray-700 border-b border-gray-200 pb-2 mb-4">
                        🏢 Current Medical Department Status
                    </h3>
                    <table className="w-full text-left border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 border border-gray-300">
                                    Department
                                </th>
                                <th className="p-3 border border-gray-300">
                                    Nurse-to-Patient Ratio
                                </th>
                                <th className="p-3 border border-gray-300">
                                    Occupancy Level
                                </th>
                                <th className="p-3 border border-gray-300">
                                    Operational Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.departments.map((dept, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-3 border border-gray-300 font-semibold">
                                        {dept.name}
                                    </td>
                                    <td className="p-3 border border-gray-300">
                                        {dept.ratio}
                                    </td>
                                    <td className="p-3 border border-gray-300">
                                        {dept.occupancy}
                                    </td>
                                    <td
                                        className={`p-3 border border-gray-300 font-bold ${
                                            dept.status === "Optimal"
                                                ? "text-green-600"
                                                : "text-orange-500"
                                        }`}
                                    >
                                        {dept.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Section 3: Alerts and Feed */}
                <div className="mb-8 print:break-inside-avoid">
                    <h3 className="text-lg font-bold text-gray-700 border-b border-gray-200 pb-2 mb-4">
                        ⚠️ Live Urgent Notifications & Requests
                    </h3>
                    <div className="space-y-3">
                        {data.alerts.map((alert, index) => {
                                const getAlertStyle = (situation: string) => {
                                switch (situation) {
                                    case "Critical":
                                        return "bg-error-container/50 border-error-container text-on-error-container";
                                    case "Warning":
                                        return " bg-[#FEF3C7] border-[#FDE68A] text-[#B45309] ";
                                    case "Routine":
                                        return "bg-green-100 border-green-300 text-green-800";
                                    default:
                                        return "bg-green-100 border-green-300 text-green-800";
                                }
                            };
                            return (
                                <div
                                    key={index}
                                    className={`p-3 rounded-md border text-sm ${getAlertStyle(alert?.Situation)}`}
                                >
                                    <strong className="block">
                                        {alert.RequestType}
                                    </strong>
                                    <span className="text-xs text-gray-500">
                                        {alert.publishedAt
                                            ? new Date(
                                                  alert.publishedAt,
                                              ).toLocaleTimeString("en-US")
                                            : ""}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Official Print Footer */}
                <div className="mt-16 text-center text-xs text-gray-400 border-t border-dashed border-gray-300 pt-4 print:break-inside-avoid">
                    <p>
                        This report was automatically generated via the CareSync
                        Admin Dashboard. Data is official and captured in
                        real-time.
                    </p>
                    <p className="mt-1">Page 1 of 1</p>
                </div>
            </div>
        );
    },
);

MedicalReport.displayName = "MedicalReport";

export default MedicalReport;
