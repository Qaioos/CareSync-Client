import type { ReactNode } from "react";

export type SummaryTone = "teal" | "green" | "amber";

interface SummaryCardProps {
    icon: ReactNode;
    label: string;
    value: number;
    tone: SummaryTone;
}

const SummaryCard = ({ icon, label, value, tone }: SummaryCardProps) => {
    const toneClasses: Record<SummaryTone, string> = {
        teal: "bg-[#e5f5f1] text-primary-container",
        green: "bg-[#eaf8ef] text-[#15803d]",
        amber: "bg-[#fff6df] text-[#b45309]",
    };

    return (
        <div className="flex items-center gap-4 rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_20px_rgba(15,118,110,0.04)]">
            <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl ${toneClasses[tone]}`}
            >
                {icon}
            </div>
            <div>
                <p className="text-2xl font-extrabold text-[#163432]">
                    {value}
                </p>
                <p className="text-xs font-semibold text-[#7b918e]">{label}</p>
            </div>
        </div>
    );
};

export default SummaryCard;
