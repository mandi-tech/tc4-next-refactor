import { gql } from "@apollo/client";

export const GET_TRANSACOES = gql`
  query GetTransacoes(
    $usuarioId: ID!
    $data_inicial: String
    $data_final: String
    $tipo: String
    $categoriaId: String
    $cursor: Int
    $tamanho_pagina: Int
  ) {
    transacoesPorUsuario(
      usuarioId: $usuarioId
      data_inicial: $data_inicial
      data_final: $data_final
      tipo: $tipo
      categoriaId: $categoriaId
      cursor: $cursor
      tamanho_pagina: $tamanho_pagina
    ) {
      total_transacoes
      transacoes {
        id
        tipo
        descricao
        valor
        categoria
        data_agendamento
        nota_fiscal
      }
    }
  }
`;

export interface Transacao {
  id: string;
  tipo: string;
  descricao: string;
  valor: number;
  categoria: string;
  data_agendamento: string;
  nota_fiscal?: string;
}

export interface TransacoesResponse {
  transacoesPorUsuario: {
    total_transacoes: number;
    transacoes: Transacao[];
  };
}

export interface TransacoesVariables {
  usuarioId: string;
  data_inicial?: string;
  data_final?: string;
  tipo?: string;
  categoriaId?: string;
  cursor?: number;
  tamanho_pagina?: number;
}
