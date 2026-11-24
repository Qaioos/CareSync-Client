import type { AnalyticsDepartment } from "../../../Types/analytics";

const WaitingQueuePanel = ({
    departments,
}: {
    departments: AnalyticsDepartment[];
}) => (
    <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 xl:col-span-5">
        <h3 className="text-lg font-bold text-[#163432]">Waiting queue</h3>
        <p className="mt-1 text-sm text-[#7b918e]">
            Current waiting volume across departments
        </p>
        <div className="mt-6 space-y-4">
            {departments.map((department) => (
                <div key={department.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold text-[#365653]">
                            {department.name}
                        </span>
                        <span className="font-bold text-[#163432]">
                            {department.waitingCount}
                        </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#edf3f1]">
                        <div
                            className="h-full rounded-full bg-[#d97706]"
                            style={{
                                width: `${Math.min(department.waitingCount * 5, 100)}%`,
                            }}
                        />
                    </div>
                </div>
            ))}
            {departments.length === 0 && (
                <p className="py-10 text-center text-sm text-[#7b918e]">
                    No department data available
                </p>
            )}
        </div>
    </section>
);

export default WaitingQueuePanel;
