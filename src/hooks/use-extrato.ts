import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { App } from "antd";
import {
  Transacao,
  GET_TRANSACOES,
  TransacoesResponse,
  TransacoesVariables,
} from "@/graphql/queries/transacoes";
import {
  CRIAR_TRANSACAO,
  EDITAR_TRANSACAO,
  DELETAR_TRANSACAO,
  CriarTransacaoResponse,
  CriarTransacaoVariables,
  EditarTransacaoResponse,
  EditarTransacaoVariables,
  DeletarTransacaoResponse,
  DeletarTransacaoVariables,
} from "@/graphql/mutations/transacoes";
import {
  parseValorNumerico,
  getCurrentUser,
  formatarDataApi,
  getBase64,
} from "@/libs/utils/transacoes_helper";
import { useMutation, useQuery } from "@apollo/client/react";
import { transactionTriggerVar } from "@/libs/apollo-client";

export interface FormValues {
  descricao: string;
  valor: string | number;
  categoria: string;
  agendamento: any;
  nota_fiscal?: { name: string; originFileObj?: File; url?: string }[];
}

export function useExtrato() {
  const { notification } = App.useApp();
  const searchParams = useSearchParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState<Transacao | undefined>(
    undefined,
  );
  const [usuarioId, setUsuarioId] = useState<string>("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoPagina, setTamanhoPagina] = useState(10);

  // Captura filtros da URL
  const tipo = searchParams.get("tipo")?.toUpperCase();
  const data_inicial = searchParams.get("data_inicial");
  const data_final = searchParams.get("data_final");
  const categoriaId = searchParams.get("categoriaId");

  // Reset de página ao filtrar
  useEffect(() => {
    setPaginaAtual(1);
  }, [tipo, data_inicial, data_final, categoriaId]);

  // Recupera usuário logado
  useEffect(() => {
    const user = getCurrentUser();
    if (user?.id) setUsuarioId(user.id);
  }, []);

  const variables = useMemo(
    () => ({
      usuarioId,
      tipo: tipo || undefined,
      data_inicial: data_inicial || undefined,
      data_final: data_final || undefined,
      categoriaId: categoriaId || undefined,
      cursor: (paginaAtual - 1) * tamanhoPagina,
      tamanho_pagina: tamanhoPagina,
    }),
    [usuarioId, tipo, data_inicial, data_final, categoriaId, paginaAtual, tamanhoPagina],
  );

  // Query do GraphQL
  const { data, loading, refetch } = useQuery<TransacoesResponse, TransacoesVariables>(
    GET_TRANSACOES,
    {
      variables,
      skip: !usuarioId,
      fetchPolicy: "cache-and-network",
    },
  );

  // Mutations
  const [criarTransacao, { loading: creating }] = useMutation<
    CriarTransacaoResponse,
    CriarTransacaoVariables
  >(CRIAR_TRANSACAO, {
    onCompleted: async () => {
      notification.success({ title: "Transação criada com sucesso!" }); 
      transactionTriggerVar(Date.now()); 
      await refetch();
    },
  });

  const [editarTransacao, { loading: updating }] = useMutation<
    EditarTransacaoResponse,
    EditarTransacaoVariables
  >(EDITAR_TRANSACAO, {
    onCompleted: () => {
      notification.success({ title: "Transação atualizada com sucesso!" });
      transactionTriggerVar(Date.now());
      refetch();
    },
  });

  const [deletarTransacao] = useMutation<DeletarTransacaoResponse, DeletarTransacaoVariables>(
    DELETAR_TRANSACAO,
    {
      onCompleted: () => {
        notification.success({ title: "Transação deletada com sucesso!" });
        transactionTriggerVar(Date.now()); 
        refetch();
      },
 
      onError: (error) => {
        notification.error({
          title: "Erro ao deletar transação",
          description: error.message,
        });
      },
    },
  );

  const handleEdit = (transacao: Transacao) => {
    setTransacaoSelecionada(transacao);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTransacaoSelecionada(undefined);
  };

  const handleDelete = (id: string) => {
    deletarTransacao({ variables: { id } });
  };

const handleSaveTransacao = async (values: FormValues) => {
    const valorNumerico = parseValorNumerico(values.valor);

    if (isNaN(valorNumerico)) {
      notification.error({
        title: "Valor inválido",
        description: "Por favor, insira um valor numérico válido.",
      });
      return;
    }

    // Identifica se há algum item ou arquivo no array de nota fiscal do formulário
    const temArquivoNoForm = values.nota_fiscal && values.nota_fiscal.length > 0;
    
    // Mudamos a tipagem local para aceitar null ou undefined temporariamente
    let notaFiscalBase64: string | null | undefined = undefined;

    if (transacaoSelecionada) {
      // --- MODO EDIÇÃO ---
      if (!temArquivoNoForm) {
        notaFiscalBase64 = null; // O backend precisa de null para saber que deve deletar
      } else {
        const fileObj = values.nota_fiscal![0].originFileObj;
        if (fileObj) {
          notaFiscalBase64 = await getBase64(fileObj);
        } else {
          notaFiscalBase64 = transacaoSelecionada.nota_fiscal || undefined;
        }
      }
    } else {
      // --- MODO CRIAÇÃO ---
      if (temArquivoNoForm) {
        const fileObj = values.nota_fiscal![0].originFileObj;
        notaFiscalBase64 = fileObj ? await getBase64(fileObj) : undefined;
      } else {
        notaFiscalBase64 = undefined; // Para criação, se não tem, mandamos undefined (ignora o campo)
      }
    }

    const commonVariables = {
      tipo: transacaoSelecionada
        ? transacaoSelecionada.tipo
        : searchParams.get("tipo")?.toUpperCase() || "ENTRADA",
      descricao: values.descricao,
      valor: valorNumerico,
      categoria: values.categoria,
      data_agendamento: formatarDataApi(values.agendamento),
    };

    if (transacaoSelecionada) {
      editarTransacao({
        variables: {
          id: transacaoSelecionada.id,
          ...commonVariables,
          // Se o seu EditarTransacaoVariables também reclamar de 'null', adicione um 'as any' aqui
          nota_fiscal: notaFiscalBase64 as any, 
        },
      });
    } else {
      criarTransacao({
        variables: {
          usuarioId,
          ...commonVariables,
          tipo: commonVariables.tipo || "ENTRADA",
          // Garantimos que nunca será 'null' na criação, satisfazendo o tipo 'string | undefined'
          nota_fiscal: notaFiscalBase64 ?? undefined, 
        },
      });
    }

    handleCloseModal();
  };

  return {
    listaTransacoes: data?.transacoesPorUsuario?.transacoes || [],
    totalItens: data?.transacoesPorUsuario?.total_transacoes || 0,
    loading,
    mutating: creating || updating,
    modalOpen,
    transacaoSelecionada,
    paginaAtual,
    tamanhoPagina,
    setPaginaAtual,
    setTamanhoPagina,
    handleEdit,
    handleDelete,
    handleCloseModal,
    handleSaveTransacao,
  };
}