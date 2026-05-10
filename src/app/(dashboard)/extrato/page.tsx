"use client";

import Filtros from "@/components/features/filtros/filtros";
import ModalTransacao from "@/components/features/modals/modal_transacao";
import { iTransacao } from "@/libs/types/iTransacoes";
import { dataMock, getColunasExtrato } from "@/libs/utils/tabela_transacao";
import { Button, Table } from "antd";
import { useState } from "react";

export default function ExtratoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState<
    iTransacao | undefined
  >(undefined);

  const handleEdit = (transacao: iTransacao) => {
    setTransacaoSelecionada(transacao);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTransacaoSelecionada(undefined);
  };

  const handleDelete = (id: string) => {
    console.log("Deletando ID:", id);
  };

  const handleSaveTransacao = (values: any) => {
    const dadosFormatados = {
      ...values,
      agendamento: values.agendamento
        ? values.agendamento.format("DD/MM/YYYY")
        : null,

      nota_fiscal:
        values.nota_fiscal && values.nota_fiscal.length > 0
          ? values.nota_fiscal[0].name
          : null,
    };

    console.log("Dados prontos para o Backend:", dadosFormatados);

    handleCloseModal();
  };

  const colunas = getColunasExtrato({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="flex flex-col gap-8">
      <Filtros />

      <Table columns={colunas} dataSource={dataMock} rowKey="id" />

      <ModalTransacao
        isModalOpen={modalOpen}
        handleOk={handleSaveTransacao}
        handleCancel={handleCloseModal}
        tipo={transacaoSelecionada ? "edicao" : "novo"}
        tipoTransacao={
          (transacaoSelecionada?.tipo?.toLowerCase() as any) || "entrada"
        }
        initialData={transacaoSelecionada}
      />
    </div>
  );
}
