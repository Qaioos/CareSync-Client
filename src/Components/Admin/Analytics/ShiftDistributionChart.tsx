import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export interface ShiftDistributionItem {
    name: string;
    value: number;
}

interface ShiftDistributionChartProps {
    data: ShiftDistributionItem[];
}

const COLORS = ["#0f766e", "#e0a02f", "#4f46a5"];

const ShiftDistributionChart = ({ data }: ShiftDistributionChartProps) => (
    <div className="h-72 w-full">
        {data.every((item) => item.value === 0) ? (
            <div className="flex h-full items-center justify-center text-sm text-[#7b918e]">
                No shift data available
            </div>
        ) : (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={58}
                        outerRadius={92}
                        paddingAngle={4}
                        stroke="none"
                    >
                        {data.map((item, index) => (
                            <Cell
                                key={item.name}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: 12,
                            border: "1px solid #dce9e6",
                            fontSize: 12,
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        )}
    </div>
);

export default ShiftDistributionChart;
