import { gql } from "@apollo/client";
import { Transacao } from "../queries/transacoes";

export const CRIAR_TRANSACAO = gql`
  mutation CriarTransacao(
    $usuarioId: ID!
    $tipo: String!
    $descricao: String!
    $valor: Float!
    $categoria: String!
    $data_agendamento: String!
    $nota_fiscal: String
  ) {
    criarTransacao(
      usuarioId: $usuarioId
      tipo: $tipo
      descricao: $descricao
      valor: $valor
      categoria: $categoria
      data_agendamento: $data_agendamento
      nota_fiscal: $nota_fiscal
    ) {
      id
      tipo
      descricao
      valor
      categoria
      data_agendamento
      nota_fiscal
    }
  }
`;

export const EDITAR_TRANSACAO = gql`
  mutation EditarTransacao(
    $id: ID!
    $tipo: String
    $descricao: String
    $valor: Float
    $categoria: String
    $data_agendamento: String
    $nota_fiscal: String
  ) {
    editarTransacao(
      id: $id
      tipo: $tipo
      descricao: $descricao
      valor: $valor
      categoria: $categoria
      data_agendamento: $data_agendamento
      nota_fiscal: $nota_fiscal
    ) {
      id
      tipo
      descricao
      valor
      categoria
      data_agendamento
      nota_fiscal
    }
  }
`;

export const DELETAR_TRANSACAO = gql`
  mutation DeletarTransacao($id: ID!) {
    deletarTransacao(id: $id)
  }
`;

export interface CriarTransacaoResponse {
  criarTransacao: Transacao;
}

export interface CriarTransacaoVariables {
  usuarioId: string;
  tipo: string;
  descricao: string;
  valor: number;
  categoria: string;
  data_agendamento: string;
  nota_fiscal?: string;
}

export interface EditarTransacaoResponse {
  editarTransacao: Transacao;
}

export interface EditarTransacaoVariables {
  id: string;
  tipo?: string;
  descricao?: string;
  valor?: number;
  categoria?: string;
  data_agendamento?: string;
  nota_fiscal?: string;
}

export interface DeletarTransacaoResponse {
  deletarTransacao: boolean;
}

export interface DeletarTransacaoVariables {
  id: string;
}
