import { iEstilos } from "./iEstilos";

export interface iCardProps extends iEstilos {
  footer?: React.ReactNode;
  icone: React.ReactNode;
  descricao: string;
  valor: string;
  loading?: boolean;
}
