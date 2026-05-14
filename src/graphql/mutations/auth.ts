import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $senha: String!) {
    login(email: $email, senha: $senha) {
      token
      usuario {
        id
        nome
        email
      }
    }
  }
`;

export interface LoginResponse {
  login: {
    token: string;
    usuario: {
      id: string;
      nome: string;
      email: string;
    };
  };
}

export interface LoginVariables {
  email: string;
  senha: string;
}

export const CRIAR_USUARIO_MUTATION = gql`
  mutation CriarUsuario($nome: String!, $email: String!, $senha: String!) {
    criarUsuario(nome: $nome, email: $email, senha: $senha) {
      id
      nome
      email
    }
  }
`;

export interface CriarUsuarioResponse {
  criarUsuario: {
    id: string;
    nome: string;
    email: string;
  };
}

export interface CriarUsuarioVariables {
  nome: string;
  email: string;
  senha: string;
}
