import { MdBarChart } from "react-icons/md";
import type { AnalyticsDepartment } from "../../../Types/analytics";
import DepartmentCapacityChart from "./DepartmentCapacityChart";

const DepartmentCapacityPanel = ({
    departments,
}: {
    departments: AnalyticsDepartment[];
}) => (
    <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 xl:col-span-8">
        <div className="mb-2 flex items-start justify-between">
            <div>
                <h3 className="text-lg font-bold text-[#163432]">
                    Department capacity
                </h3>
                <p className="mt-1 text-sm text-[#7b918e]">
                    Active beds and waiting volume
                </p>
            </div>
            <div className="rounded-xl bg-[#e5f5f1] p-2 text-primary-container">
                <MdBarChart className="text-xl" />
            </div>
        </div>
        <DepartmentCapacityChart departments={departments} />
    </section>
);

export default DepartmentCapacityPanel;
