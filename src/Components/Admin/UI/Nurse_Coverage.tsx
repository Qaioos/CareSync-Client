import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

// 💡 مكوّن الـ Tooltip بدون الحاجة لاستيراد أي أنواع معقدة من Recharts
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    // التحقق الآمن من وجود البيانات واكتمالها
    if (active && payload && payload.length >= 2) {
        const nurses = payload[0]?.value ?? 0;
        const patients = payload[1]?.value ?? 0;

        // حساب كفاءة التغطية المئوية
        const coverage = patients > 0 ? Math.round((Number(nurses) / (Number(patients) / 2)) * 100) : 100;

        return (
            <div className="bg-white p-3 rounded-xl border border-solid border-gray-200 shadow-md">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                    {label}
                </p>
                <p className="text-sm text-teal-600 flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-teal-500 block"></span>
                    Nurses: <strong>{nurses}</strong>
                </p>
                <p className="text-sm text-emerald-600 flex items-center gap-2 mb-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 block"></span>
                    Patients: <strong>{patients}</strong>
                </p>
                <div className="pt-2 border-t border-solid border-gray-100">
                    <p className="text-xs font-bold text-gray-700">
                        Coverage Efficiency: <span className={coverage < 100 ? "text-amber-600" : "text-emerald-600"}>{coverage}%</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const Nurse_Coverage = () => {
    const chartData = [
        { time: "08:00 AM", nurses: 5, patients: 10 },
        { time: "12:00 PM", nurses: 6, patients: 14 },
        { time: "04:00 PM", nurses: 4, patients: 12 },
        { time: "08:00 PM", nurses: 7, patients: 15 },
        { time: "12:00 AM", nurses: 5, patients: 8 },
        { time: "04:00 AM", nurses: 3, patients: 6 },
    ];

    return (
        <div className="bg-white rounded-xl card-shadow p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 w-full max-w-[700px]">
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Nurse Coverage vs Demand
                    </h3>
                    <p className="text-sm text-gray-500">
                        Rolling 24-hour predictive model
                    </p>
                </div>
                <div className="flex items-center gap-4 self-end md:self-center">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                        <span className="text-xs font-medium text-gray-500">Coverage</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-xs font-medium text-gray-500">Demand</span>
                    </div>
                </div>
            </div>

            <div className="w-full h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -25,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="time" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                        
                        <Tooltip content={<CustomTooltip />} />

                        <Area type="monotone" dataKey="nurses" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.15} strokeWidth={2} />
                        <Area type="monotone" dataKey="patients" stroke="#10b981" fill="#10b981" fillOpacity={0.05} strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
                <RechartsDevtools />
            </div>
        </div>
    );
};

export default Nurse_Coverage;
