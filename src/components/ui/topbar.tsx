"use client";

import { Avatar, Button } from "antd";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ModalTransacao from "../features/modals/modal_transacao";

export default function Topbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tipoTransacao, setTipoTransacao] = useState<"entrada" | "saida">(
    "entrada",
  );

  const pathname = usePathname();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleReceitaOpen = () => {
    setTipoTransacao("entrada");
    setModalOpen(true);
  };

  const handleSaidaOpen = () => {
    setTipoTransacao("saida");
    setModalOpen(true);
  };

  const handleSaveNewTransacao = (values: any) => {
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

    console.log(
      `Criando nova ${tipoTransacao.toUpperCase()}:`,
      dadosFormatados,
    );

    handleCloseModal();
  };

  const getTitle = () => {
    if (pathname === "/") return "Dashboard";
    const routeName = pathname.split("/")[1];
    return routeName.charAt(0).toUpperCase() + routeName.slice(1);
  };

  return (
    <div className="flex justify-between items-center py-5">
      <h1 className="text-3xl font-semibold text-foreground">{getTitle()}</h1>

      <div className="flex items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <Button
            className="w-full !bg-branco !text-azul"
            onClick={handleReceitaOpen}
            size="large"
          >
            Nova Receita
          </Button>
          <Button
            variant="outlined"
            className="w-full !bg-azul !text-branco"
            onClick={handleSaidaOpen}
            size="large"
          >
            Nova Saída
          </Button>
        </div>

        <div className="flex items-center gap-2 border-l pl-4 border-border">
          <Avatar
            style={{
              backgroundColor: "var(--lavanda)",
              color: "var(--branco)",
            }}
          >
            U
          </Avatar>
          <h5 className="text-md text-foreground">Nome do usuário</h5>
        </div>
      </div>
      <ModalTransacao
        isModalOpen={modalOpen}
        handleOk={handleSaveNewTransacao}
        handleCancel={handleCloseModal}
        tipo={"novo"}
        tipoTransacao={tipoTransacao}
      />
    </div>
  );
}
