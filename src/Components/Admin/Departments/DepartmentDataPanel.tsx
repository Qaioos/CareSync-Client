import type { DepartmentRecord } from "../../../Features/department/department.types";
import { getDepartmentDetailFields } from "../../../Features/department/department.utils";

const DepartmentDataPanel = ({
    department,
}: {
    department: DepartmentRecord;
}) => (
    <section className="overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_8px_24px_rgba(15,118,110,0.04)]">
        <div className="border-b border-[#e7efed] px-5 py-4">
            <h2 className="text-lg font-bold text-[#163432]">
                Department record
            </h2>
            <p className="mt-1 text-sm text-[#7b918e]">
                All fields returned by the department service.
            </p>
        </div>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
            {getDepartmentDetailFields(department).map((field) => (
                <div
                    key={field.label}
                    className="min-w-0 border-b border-[#edf3f1] pb-3"
                >
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#91a5a2]">
                        {field.label}
                    </dt>
                    <dd className="mt-1 break-words text-sm font-semibold text-[#365653]">
                        {field.value}
                    </dd>
                </div>
            ))}
        </dl>
    </section>
);

export default DepartmentDataPanel;
