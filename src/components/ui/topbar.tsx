"use client";

import { App, Avatar, Button } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ModalTransacao from "../features/modals/modal_transacao";
import { useTransacoes } from "@/hooks/use-transacoes";
import { MenuOutlined } from "@ant-design/icons";
import { useSidebar } from "@/context/sidebar-context";

export default function Topbar() {
  const {message} = App.useApp()
  const { criarTransacao, creating } = useTransacoes();
  const { isMobile, setIsOpen } = useSidebar();
  const [modalOpen, setModalOpen] = useState(false);
  const [tipoTransacao, setTipoTransacao] = useState<"entrada" | "saida">(
    "entrada",
  );
  const [nomeUsuario, setNomeUsuario] = useState<string>("Usuário");

  const pathname = usePathname();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user?.nome) {
          setNomeUsuario(user.nome);
        }
      } catch (err) {
        console.error("Erro ao converter usuário do localStorage", err);
      }
    }
  }, []);

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

  const handleSaveNewTransacao = async (values: any) => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        message.error(
          "Usuário não encontrado. Por favor, faça login novamente.",
        );
        return;
      }
      const user = JSON.parse(userStr);

      await criarTransacao({
        usuarioId: user.id,
        tipo: tipoTransacao.toUpperCase(),
        descricao: values.descricao,
        valor: values.valor,
        categoria: values.categoria,
        data_agendamento: values.agendamento
          ? values.agendamento.format("DD/MM/YYYY")
          : "",
        nota_fiscal:
          values.nota_fiscal && values.nota_fiscal.length > 0
            ? values.nota_fiscal[0].name
            : undefined,
      });

      message.success(
        `${tipoTransacao === "entrada" ? "Receita" : "Despesa"} criada com sucesso!`,
      );
      handleCloseModal();
    } catch (err: any) {
      message.error(err.message || "Erro ao criar transação.");
    }
  };

  const getTitle = () => {
    if (pathname === "/") return "Dashboard";
    const routeName = pathname.split("/")[1];
    return routeName.charAt(0).toUpperCase() + routeName.slice(1);
  };

  const inicial = nomeUsuario.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col md:flex-row justify-between items-end lg:items-center py-5 gap-4">
      <div className="flex items-center gap-3 w-full md:w-auto">
        {isMobile && (
          <Button
            icon={<MenuOutlined />}
            onClick={() => setIsOpen(true)}
            className="!bg-azul !text-branco border-none shadow-sm"
          />
        )}
        <h1 className="text-3xl font-semibold text-foreground">{getTitle()}</h1>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="grid grid-cols-2 gap-2 md:w-[fit-content] w-full">
          <Button
            className="!col-span-1 md:!w-[fit-content] !bg-branco !text-azul "
            onClick={handleReceitaOpen}
            size="large"
          >
            Nova Receita
          </Button>
          <Button
            variant="outlined"
            className="!col-span-1 w-full !bg-azul !text-branco"
            onClick={handleSaidaOpen}
            size="large"
          >
            Nova Saída
          </Button>
        </div>

        <div className="flex items-center gap-2 border-l pl-4 border-border hidden lg:flex">
          <Avatar
            style={{
              backgroundColor: "var(--lavanda)",
              color: "var(--branco)",
            }}
          >
            {inicial}
          </Avatar>
          <h5 className="text-md text-foreground ">{nomeUsuario}</h5>
        </div>
      </div>
      <ModalTransacao
        isModalOpen={modalOpen}
        handleOk={handleSaveNewTransacao}
        handleCancel={handleCloseModal}
        tipo={"novo"}
        tipoTransacao={tipoTransacao}
        loading={creating}
      />
    </div>
  );
}
