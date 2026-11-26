import { Link } from "react-router-dom";
import { MdArrowOutward, MdWarning } from "react-icons/md";
import useDepartment from "../../../Features/department/useDepartment";
import { DEPARTMENTS } from "../../../Features/department/department.config";
import {
    getDepartmentOccupancy,
    getDepartmentStatusClassName,
} from "../../../Features/department/department.utils";
import {
    ResourceLoading,
    ResourceState,
} from "../Shared/ResourceState";

const Department_Grid = () => {
    const { departments, isLoading, err } = useDepartment();

    if (isLoading) {
        return (
            <section className="md:col-span-8">
                <ResourceLoading rows={3} />
            </section>
        );
    }

    if (err) {
        return (
            <section className="md:col-span-8 rounded-2xl border border-[#dce9e6] bg-white">
                <ResourceState
                    icon={<MdWarning />}
                    title="Could not load departments"
                    description={err}
                />
            </section>
        );
    }

    return (
        <section
            aria-label="Department overview"
            className="grid grid-cols-1 gap-6 md:col-span-8 md:grid-cols-3"
        >
            {DEPARTMENTS.map((config) => {
                const department = departments[config.key];
                const situation = department?.Situation || "Status unavailable";
                const occupancy = department
                    ? getDepartmentOccupancy(department)
                    : 0;

                return (
                    <Link
                        key={config.key}
                        to={`/admin/departments/${config.key}`}
                        className="group rounded-xl border border-[#dce9e6] border-l-4 bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.04)] outline-none transition hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(15,118,110,0.12)] focus-visible:ring-2 focus-visible:ring-primary"
                        style={{ borderLeftColor: config.accent }}
                        aria-label={`View ${config.name} department details`}
                    >
                        <div className="mb-4 flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-bold text-[#163432]">
                                    {config.name}
                                </h2>
                                <p className="mt-1 text-xs text-[#7b918e]">
                                    Nurse ratio {config.nurseRatio}
                                </p>
                            </div>
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${getDepartmentStatusClassName(department?.Situation)}`}
                            >
                                {situation}
                            </span>
                        </div>

                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-2xl font-extrabold text-primary-container">
                                    {department?.ActiveBeds ?? 0}/
                                    {department?.TotalBeds ?? 0}
                                </p>
                                <p className="text-xs text-[#7b918e]">
                                    Active beds
                                </p>
                            </div>
                            {config.key === "emergency" && (
                                <div className="text-right">
                                    <p className="text-lg font-bold text-[#163432]">
                                        {department?.WaitingCount ?? 0}
                                    </p>
                                    <p className="text-xs text-[#7b918e]">
                                        Waiting
                                    </p>
                                </div>
                            )}
                            <span className="flex items-center gap-1 text-xs font-bold text-primary-container opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                                Details
                                <MdArrowOutward aria-hidden="true" />
                            </span>
                        </div>
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#edf3f1]">
                            <div
                                className="h-full rounded-full bg-primary-container"
                                style={{ width: `${occupancy}%` }}
                            />
                        </div>
                        <p className="mt-1 text-right text-[11px] text-[#7b918e]">
                            {Math.round(occupancy)}% bed occupancy
                        </p>
                    </Link>
                );
            })}
        </section>
    );
};

export default Department_Grid;
