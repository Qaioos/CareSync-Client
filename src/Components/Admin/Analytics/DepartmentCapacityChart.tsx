import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { AnalyticsDepartment } from "../../../Types/analytics";

interface DepartmentCapacityChartProps {
    departments: AnalyticsDepartment[];
}

const DepartmentCapacityChart = ({
    departments,
}: DepartmentCapacityChartProps) => (
    <div className="w-full">
        {departments.length === 0 ? (
            <div className="flex h-72 items-center justify-center text-sm text-[#7b918e]">
                No department metrics available
            </div>
        ) : (
            <>
                <div className="mb-3 flex justify-end gap-5 px-2 text-xs font-semibold text-[#607774]">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-sm bg-primary-container" />
                        Active beds
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-sm bg-[#d97706]" />
                        Waiting
                    </div>
                </div>

                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={departments}
                            barCategoryGap="28%"
                            margin={{ top: 8, right: 8, left: -12, bottom: 8 }}
                        >
                            <CartesianGrid
                                stroke="#edf3f1"
                                strokeDasharray="4 4"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="name"
                                tick={{
                                    fill: "#607774",
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                                axisLine={false}
                                tickLine={false}
                                tickMargin={12}
                                dy={2}
                            />
                            <YAxis
                                tick={{ fill: "#718783", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                tickMargin={8}
                                allowDecimals={false}
                            />
                            <Tooltip
                                cursor={{ fill: "#f4f8f7" }}
                                contentStyle={{
                                    borderRadius: 12,
                                    border: "1px solid #dce9e6",
                                    boxShadow:
                                        "0 8px 24px rgba(15,118,110,0.08)",
                                    fontSize: 12,
                                }}
                            />
                            <Bar
                                dataKey="activeBeds"
                                name="Active beds"
                                fill="#0f766e"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={38}
                            />
                            <Bar
                                dataKey="waitingCount"
                                name="Waiting"
                                fill="#d97706"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={38}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </>
        )}
    </div>
);

export default DepartmentCapacityChart;
