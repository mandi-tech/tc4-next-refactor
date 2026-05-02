import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export interface ChartData {
  [key: string]: any;
}

export interface ChartConfig {
  key: string; // O nome da propriedade no objeto de dados
  label: string; // O nome que aparecerá na legenda
  color: string; // Cor (Hex, RGBA ou variável CSS)
  type: "line" | "bar";
}

export interface CustomChartProps {
  data: ChartData[];
  configs: ChartConfig[];
  xAxisKey: string;
  titulo?: string;
  className?: string;
}

export default function GraficoLinhasBarras({
  data,
  configs,
  xAxisKey,
  titulo,
  className,
}: CustomChartProps) {
  return (
    <div
      className={`${className} w-full bg-secondary-background shadow-sm p-4 rounded-xl p-5  border-border  border`}
    >
      <h2 className="text-xl font-semibold text-foreground mb-4">{titulo}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--border)"
          />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />

          {configs.map((config) => {
            if (config.type === "bar") {
              return (
                <Bar
                  key={config.key}
                  dataKey={config.key}
                  name={config.label}
                  fill={config.color}
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              );
            }
            return (
              <Line
                key={config.key}
                type="monotone"
                dataKey={config.key}
                name={config.label}
                stroke={config.color}
                strokeWidth={3}
                dot={{ r: 4, fill: config.color }}
                activeDot={{ r: 6 }}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
