import { iEstilos } from "./iEstilos";

export interface iInput extends iEstilos {
  size?: "large" | "small" | "medium";
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  prefixo?: React.ReactNode;
  sufixo?: React.ReactNode;
  className?: string;
  mascara?: string;
}

export interface iDateInput extends iEstilos {
  size?: "large" | "small" | "medium";
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export interface iSelectInput extends iEstilos {
  size?: "large" | "small" | "medium";
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  prefixo?: React.ReactNode;
  sufixo?: React.ReactNode;
  className?: string;
  options: { label: string; value: string }[];
}
