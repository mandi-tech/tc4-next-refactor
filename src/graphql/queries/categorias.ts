import { gql } from "@apollo/client";

export const GET_CATEGORIAS = gql`
  query ListarCategorias {
    listarCategorias {
      id
      categoria
      tipo
    }
  }
`;

export interface Categoria {
  id: string;
  categoria: string;
  tipo: "ENTRADA" | "SAIDA";
}

export interface CategoriasResponse {
  listarCategorias: Categoria[];
}
