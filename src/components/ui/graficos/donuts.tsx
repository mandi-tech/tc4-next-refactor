import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface DonutData {
  name: string;
  value: number;
}

interface DonutChartProps {
  data: DonutData[];
  colors?: string[];
  className?: string;
  titulo?: string;
  loading?: boolean;
}

const DEFAULT_COLORS = ["#2b2675", "#eb2f96", "#a99bf7", "#d1d84e", "#ff4d4f"];

import { Skeleton } from "antd";

export default function GraficoDonuts({
  data,
  colors = DEFAULT_COLORS,
  className,
  titulo,
  loading,
}: DonutChartProps) {
  return (
    <div
      className={`${className} w-full h-[400px] p-4 bg-secondaryBackground  rounded-xl border-border shadow-sm border`}
    >
      <h2 className="text-xl font-semibold text-secondaryForeground mb-4">
        {titulo}
      </h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[300px] gap-4">
          <Skeleton.Avatar active size={200} shape="circle" />
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
