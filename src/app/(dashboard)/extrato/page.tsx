"use client";

import Filtros from "@/components/features/filtros/filtros";
import ModalTransacao from "@/components/features/modals/modal_transacao";
import { getColunasExtrato } from "@/libs/utils/tabela_transacao";
import { Table } from "antd";
import { useEffect, useMemo, useState } from "react";

import { useQuery, useMutation } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
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
import { notification } from "antd";

export default function ExtratoPage() {
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState<
    Transacao | undefined
  >(undefined);
  const [usuarioId, setUsuarioId] = useState<string>("");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoPagina, setTamanhoPagina] = useState(10);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user?.id) setUsuarioId(user.id);
      } catch (e) {
        console.error("Erro ao ler usuário do localStorage", e);
      }
    }
  }, []);

  const tipo = searchParams.get("tipo")?.toUpperCase();
  const data_inicial = searchParams.get("data_inicial");
  const data_final = searchParams.get("data_final");
  const categoriaId = searchParams.get("categoriaId");

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
    [
      usuarioId,
      tipo,
      data_inicial,
      data_final,
      categoriaId,
      paginaAtual,
      tamanhoPagina,
    ],
  );

  const { data, loading, refetch } = useQuery<
    TransacoesResponse,
    TransacoesVariables
  >(GET_TRANSACOES, {
    variables,
    skip: !usuarioId,
    fetchPolicy: "cache-and-network",
  });

  const totalItens = data?.transacoesPorUsuario?.total_transacoes || 0;
  const listaTransacoes = data?.transacoesPorUsuario?.transacoes || [];

  const [criarTransacao, { loading: creating }] = useMutation<
    CriarTransacaoResponse,
    CriarTransacaoVariables
  >(CRIAR_TRANSACAO, {
    onCompleted: () => {
      notification.success({ message: "Transação criada com sucesso!" });
      refetch();
    },
  });

  const [editarTransacao, { loading: updating }] = useMutation<
    EditarTransacaoResponse,
    EditarTransacaoVariables
  >(EDITAR_TRANSACAO, {
    onCompleted: () => {
      notification.success({ message: "Transação atualizada com sucesso!" });
      refetch();
    },
  });

  const [deletarTransacao] = useMutation<
    DeletarTransacaoResponse,
    DeletarTransacaoVariables
  >(DELETAR_TRANSACAO, {
    onCompleted: () => {
      notification.success({ message: "Transação deletada com sucesso!" });
      refetch();
    },
    onError: (error) => {
      notification.error({
        message: "Erro ao deletar transação",
        description: error.message,
      });
    },
  });

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

  const handleSaveTransacao = (values: any) => {
    const commonVariables = {
      tipo: transacaoSelecionada
        ? transacaoSelecionada.tipo
        : searchParams.get("tipo")?.toUpperCase() || "ENTRADA",
      descricao: values.descricao,
      valor: values.valor,
      categoria: values.categoria,
      data_agendamento: values.agendamento.format("DD/MM/YYYY"),
      nota_fiscal: values.nota_fiscal?.[0]?.name,
    };

    if (transacaoSelecionada) {
      editarTransacao({
        variables: {
          id: transacaoSelecionada.id,
          ...commonVariables,
        },
      });
    } else {
      criarTransacao({
        variables: {
          usuarioId,
          ...commonVariables,
          tipo: commonVariables.tipo || "ENTRADA",
        },
      });
    }

    handleCloseModal();
  };

  const colunas = getColunasExtrato({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  useEffect(() => {
    setPaginaAtual(1);
  }, [tipo, data_inicial, data_final, categoriaId]);

  return (
    <div className="flex flex-col gap-8">
      <Filtros />
      <div className="w-[100%] overflow-x-auto overflow-y-hidden">
        <Table
          columns={colunas}
          dataSource={listaTransacoes}
          rowKey="id"
          loading={loading}
          pagination={{
            current: paginaAtual,
            pageSize: tamanhoPagina,
            total: totalItens,
            showSizeChanger: true,
            position: ["bottomRight"],
            // Esta função roda quando o usuário clica nos números ou muda o tamanho
            onChange: (page, pageSize) => {
              setPaginaAtual(page);
              setTamanhoPagina(pageSize);
            },
          }}
        />
      </div>

      <ModalTransacao
        isModalOpen={modalOpen}
        handleOk={handleSaveTransacao}
        handleCancel={handleCloseModal}
        tipo={transacaoSelecionada ? "edicao" : "novo"}
        tipoTransacao={
          (transacaoSelecionada?.tipo?.toLowerCase() as any) || "entrada"
        }
        initialData={transacaoSelecionada}
        loading={creating || updating}
      />
    </div>
  );
}
