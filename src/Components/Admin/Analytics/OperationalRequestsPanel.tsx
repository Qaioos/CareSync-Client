interface RequestTypeMetric {
    name: string;
    value: number;
}

interface OperationalRequestsPanelProps {
    requestTypes: RequestTypeMetric[];
    waitingPatients: number;
    scheduledShifts: number;
}

const MetricCard = ({ label, value }: { label: string; value: number }) => (
    <div className="rounded-2xl border border-[#e7efed] bg-[#f8fcfb] p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-[#91a5a2]">
            {label}
        </p>
        <p className="mt-2 text-3xl font-extrabold text-[#163432]">{value}</p>
    </div>
);

const OperationalRequestsPanel = ({
    requestTypes,
    waitingPatients,
    scheduledShifts,
}: OperationalRequestsPanelProps) => (
    <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 xl:col-span-7">
        <h3 className="text-lg font-bold text-[#163432]">
            Operational requests
        </h3>
        <p className="mt-1 text-sm text-[#7b918e]">
            Requests within the selected period
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {requestTypes.map((item) => (
                <MetricCard
                    key={item.name}
                    label={item.name}
                    value={item.value}
                />
            ))}
            <MetricCard label="Waiting patients" value={waitingPatients} />
            <MetricCard label="Scheduled shifts" value={scheduledShifts} />
        </div>
    </section>
);

export default OperationalRequestsPanel;
