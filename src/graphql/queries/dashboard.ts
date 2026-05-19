import { gql } from "@apollo/client";

export const GET_METRICAS = gql`
  query GetMetricas($usuarioId: ID!, $data_inicial: String, $data_final: String) {
    metricas(usuarioId: $usuarioId, data_inicial: $data_inicial, data_final: $data_final) {
      total_entrada
      total_saida
      saldo
    }
  }
`;

export const GET_ANALISE_EXTRATO = gql`
  query GetAnaliseExtrato($usuarioId: ID!, $data_inicial: String, $data_final: String) {
    analiseExtrato(usuarioId: $usuarioId, data_inicial: $data_inicial, data_final: $data_final) {
      data
      entrada
      saida
      saldo
    }
  }
`;

export const GET_SAIDAS_POR_CATEGORIA = gql`
  query GetSaidasPorCategoria($usuarioId: ID!, $data_inicial: String, $data_final: String) {
    saidasPorCategoria(
      usuarioId: $usuarioId
      data_inicial: $data_inicial
      data_final: $data_final
    ) {
      categoria
      quantidade
      porcentagem
    }
  }
`;

export interface MetricasResponse {
  metricas: {
    total_entrada: number;
    total_saida: number;
    saldo: number;
  };
}

export interface AnaliseExtratoItem {
  data: string;
  entrada: number;
  saida: number;
  saldo: number;
}

export interface AnaliseExtratoResponse {
  analiseExtrato: AnaliseExtratoItem[];
}

export interface SaidaPorCategoriaItem {
  categoria: string;
  quantidade: number;
  porcentagem: number;
}

export interface SaidasPorCategoriaResponse {
  saidasPorCategoria: SaidaPorCategoriaItem[];
}

export interface DashboardVariables {
  usuarioId: string;
  data_inicial?: string;
  data_final?: string;
}
