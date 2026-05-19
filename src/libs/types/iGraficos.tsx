export interface ChartData {
  [key: string]: any;
}

export interface ChartConfig {
  key: string; 
  label: string; 
  color: string; 
  type: "line" | "bar";
}

export interface CustomChartProps {
  data: ChartData[];
  configs: ChartConfig[];
  xAxisKey: string;
  titulo?: string;
  className?: string;
  loading?: boolean;
}

export interface DonutData {
  name: string;
  value: number;
}

export interface DonutChartProps {
  data: DonutData[];
  colors?: string[];
  className?: string;
  titulo?: string;
  loading?: boolean;
}

export const DEFAULT_COLORS = ["#2b2675", "#eb2f96", "#a99bf7", "#d1d84e", "#ff4d4f"];