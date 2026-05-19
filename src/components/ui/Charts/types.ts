export interface DonutData {
  name: string;
  value: number;
}

export interface DonutChartProps {
  data: DonutData[];
  colors?: string[];
  className?: string;
  title?: string;
  loading?: boolean;
}

export interface ChartConfig {
  key: string;
  label: string;
  color: string;
  type: "line" | "bar";
}

export interface CustomChartProps<T = Record<string, any>> {
  data: T[];
  configs: ChartConfig[];
  xAxisKey: string;
  title?: string;
  className?: string;
  loading?: boolean;
}
