"use client";

import React from "react";
import { Table } from "antd";
import Filtros from "@/components/features/filtros/filtros";
import ModalTransacao from "@/components/features/modals/modal_transacao";
import { getColunasExtrato } from "@/libs/utils/tabela_transacao";
import { useExtrato } from "@/hooks/use-extrato";

export default function ExtratoPage() {
  const {
    listaTransacoes,
    totalItens,
    loading,
    mutating,
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
  } = useExtrato();

  const colunas = getColunasExtrato({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="flex flex-col gap-xl">
      <Filtros />
      
      <div className="w-full overflow-x-auto border border-border shadow-sm rounded-xl bg-background-secondary">
        <Table
          columns={colunas}
          dataSource={listaTransacoes}
          rowKey="id"
          loading={loading}
          className="w-full"
          pagination={{
            current: paginaAtual,
            pageSize: tamanhoPagina,
            total: totalItens,
            showSizeChanger: true,
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
        tipoTransacao={(transacaoSelecionada?.tipo?.toLowerCase() as "entrada" | "saida") || "entrada"}
        initialData={transacaoSelecionada}
        loading={mutating}
      />
    </div>
  );
}