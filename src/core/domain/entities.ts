export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

export interface Transacao {
  id: string;
  data: string;
  tipo: "ENTRADA" | "SAIDA";
  categoria: string;
  valor: number;
  descricao: string;
  data_agendamento?: string;
  nota_fiscal?: string;
}

export interface MetricasFinanceiras {
  saldo: string;
  totalEntrada: string;
  totalSaida: string;
  loading: boolean;
}

export interface ChartData {
  mes: string;
  renda: number;
  gastos: number;
  saldo: number;
}
