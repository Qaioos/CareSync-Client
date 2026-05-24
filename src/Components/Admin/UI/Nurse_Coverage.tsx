import type { NurseCoverage } from "../../../Types/api.responses";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps, // 1. تم إضافة الاستيراد المفقود هنا
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

// 2. تصحيح هيكل الواجهة وجعلها متوافقة مع الـ Tooltip
export interface CustomTooltipProps extends Omit<TooltipProps<number, string>, 'payload'> {
  active?: boolean;
  label?: string;
  payload?: Array<{
    color?: string;
    dataKey?: string | number;
    fill?: string;
    graphicalItemId?: string | number;
    hide?: boolean;
    name?: string;
    nameKey?: string | number;
    payload: any; 
    stroke?: string;
    strokeWidth?: number;
    type?: undefined;
    unit?: string;
    value?: number;
  }>;
}

// 3. ربط المكون بالواجهة الصحيحة (CustomTooltipProps)
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    // التحقق الآمن من وجود المصفوفة وبها عناصر لتجنب أخطاء وقت التشغيل
    if (active && payload && payload.length >= 2) {
        // قراءة آمنة للقيم الرقمية مع وضع 0 كقيمة احتياطية
        const nurses = payload[0]?.value ?? 0;
        const patients = payload[1]?.value ?? 0;

        console.log(payload);
        console.log(active);
        console.log(label);

        // حساب نسبة التغطية المئوية الفورية لهذه النقطة الزمنية
        const coverage =
            patients > 0 ? Math.round((nurses / (patients / 2)) * 100) : 100;

        return (
            <div className="bg-white p-1 rounded-xl border border-solid border-surface-container-high">
                <p className="font-label-md text-label-md text-on-surface-variant mb-2">
                    {label}
                </p>
                <p className="font-body-sm text-body-sm text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary block"></span>
                    Nurses: <strong>{nurses}</strong>
                </p>
                <p className="font-body-sm text-body-sm text-secondary flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-secondary block"></span>
                    Patients: <strong>{patients}</strong>
                </p>
                <div className="pt-2 border-t border-solid border-surface-container-low">
                    <p className="font-label-sm text-label-sm text-[#10B981]">
                        Coverage Efficiency: <strong>{coverage}%</strong>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

// 4. تصحيح نوع الـ Props لـ apiData ليكون مصفوفة من الأنواع وليس كائناً مفرداً
const Nurse_Coverage = ({ apiData }: { apiData?: NurseCoverage[] }) => {
    // بيانات افتراضية ممتازة تحاكي الـ API في حال لم يتم تمرير الـ apiData بعد
    const defaultData = [
        { time: "08:00 AM", nurses: 5, patients: 10 },
        { time: "12:00 PM", nurses: 6, patients: 14 },
        { time: "04:00 PM", nurses: 4, patients: 12 },
        { time: "08:00 PM", nurses: 7, patients: 15 },
        { time: "12:00 AM", nurses: 5, patients: 8 },
        { time: "04:00 AM", nurses: 3, patients: 6 },
    ];

    const chartData = apiData || defaultData;

    return (
        <div className="bg-white rounded-xl card-shadow flex flex-col justify-between hover:ambient-glow transition-shadow duration-300">
            {/* رأس الكارت الخاص بالعناوين */}
            <div className="mb-4">
                <h3 className="material-symbols-outlined text-headline-sm text-on-surface mb-1">
                    Nurse Coverage vs Demand
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Rolling 24-hour predictive model
                </p>
                <div className="flex items-center justify-end gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#14B8A6]"></div>
                        <span className="material-symbols-outlined text-label-sm text-on-surface-variant">
                            Coverage
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                        <span className="material-symbols-outlined text-label-sm text-on-surface-variant">
                            Demand
                        </span>
                    </div>
                </div>
            </div>

            {/* منطقة الرسم البياني المتجاوب */}
            <div style={{ width: "100%", maxWidth: "700px", height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 0,
                            left: -40, 
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="var(--color-surface-container-highest)"
                        />

                        {/* المحور الأفقي يعرض الوقت أو التاريخ */}
                        <XAxis
                            dataKey="time"
                            tick={{
                                fill: "var(--color-on-surface-variant)",
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        {/* المحور العمودي يعرض العدد الفعلي */}
                        <YAxis
                            tick={{
                                fill: "var(--color-on-surface-variant)",
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        {/* الـ Tooltip المطور المخصص لمشروعك */}
                        <Tooltip content={<CustomTooltip />} />

                        {/* المساحة الأولى: عدد الممرضات */}
                        <Area
                            type="monotone"
                            dataKey="nurses"
                            stroke="var(--color-primary)"
                            fill="var(--color-secondary)"
                            fillOpacity={0.15}
                            strokeWidth={2}
                        />

                        {/* المساحة الثانية: عدد المرضى */}
                        <Area
                            type="monotone"
                            dataKey="patients"
                            stroke="var(--color-secondary)"
                            fill="var(--color-secondary)"
                            fillOpacity={0.05}
                            strokeWidth={2}
                        />

                        <RechartsDevtools />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Nurse_Coverage;
