import {
    MdBed,
    MdGroups,
    MdOutlineHourglassTop,
} from "react-icons/md";
import type {
    DepartmentConfig,
    DepartmentRecord,
} from "../../../Features/department/department.types";
import { getDepartmentOccupancy } from "../../../Features/department/department.utils";

interface DepartmentMetricCardsProps {
    department: DepartmentRecord;
    config: DepartmentConfig;
    staffCount: number;
}

const DepartmentMetricCards = ({
    department,
    config,
    staffCount,
}: DepartmentMetricCardsProps) => {
    const occupancy = getDepartmentOccupancy(department);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.04)]">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#607774]">
                        Active beds
                    </p>
                    <MdBed className="text-xl text-primary-container" />
                </div>
                <p className="mt-3 text-2xl font-extrabold text-[#163432]">
                    {department.ActiveBeds ?? 0}
                    <span className="ml-1 text-sm font-medium text-[#91a5a2]">
                        / {department.TotalBeds ?? 0}
                    </span>
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#edf3f1]">
                    <div
                        className="h-full rounded-full bg-primary-container"
                        style={{ width: `${occupancy}%` }}
                    />
                </div>
                <p className="mt-1 text-xs text-[#7b918e]">
                    {Math.round(occupancy)}% bed occupancy
                </p>
            </section>

            <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.04)]">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#607774]">
                        Waiting
                    </p>
                    <MdOutlineHourglassTop className="text-xl text-[#b45309]" />
                </div>
                <p className="mt-3 text-2xl font-extrabold text-[#163432]">
                    {department.WaitingCount ?? 0}
                </p>
                <p className="mt-1 text-xs text-[#7b918e]">
                    Patients waiting for care
                </p>
            </section>

            <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.04)]">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#607774]">
                        Department staff
                    </p>
                    <MdGroups className="text-xl text-primary-container" />
                </div>
                <p className="mt-3 text-2xl font-extrabold text-[#163432]">
                    {staffCount}
                </p>
                <p className="mt-1 text-xs text-[#7b918e]">
                    Staff assigned to {config.name}
                </p>
            </section>

            <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.04)]">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#607774]">
                        Nurse-to-patient ratio
                    </p>
                    <MdGroups className="text-xl text-primary-container" />
                </div>
                <p className="mt-3 text-2xl font-extrabold text-[#163432]">
                    {config.nurseRatio}
                </p>
                <p className="mt-1 text-xs text-[#7b918e]">
                    Dashboard reference ratio
                </p>
            </section>
        </div>
    );
};

export default DepartmentMetricCards;
