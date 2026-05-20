import { Styles } from "@/libs/types/styles";

export interface CardProps extends Styles {
  footer?: React.ReactNode;
  icon: React.ReactNode;
  description: string;
  value: string | number;
  loading?: boolean;
}
