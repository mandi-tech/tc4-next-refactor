import { useMutation } from "@apollo/client/react";
import { CRIAR_TRANSACAO, CriarTransacaoResponse, CriarTransacaoVariables } from "@/graphql/mutations/transacoes";
import { GET_TRANSACOES } from "@/graphql/queries/transacoes";

export const useTransacoes = () => {
  const [criarTransacaoMutation, { loading: creating, error: createError }] = useMutation<CriarTransacaoResponse, CriarTransacaoVariables>(CRIAR_TRANSACAO, {
    refetchQueries: ["GetTransacoes", "GetMetricas", "GetAnaliseExtrato", "GetSaidasPorCategoria"],
  });

  const criarTransacao = async (variables: CriarTransacaoVariables) => {
    return await criarTransacaoMutation({
      variables,
    });
  };

  return {
    criarTransacao,
    creating,
    createError,
  };
};
