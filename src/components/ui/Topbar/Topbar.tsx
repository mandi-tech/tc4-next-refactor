// src/components/ui/Topbar/Topbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { App, Avatar, Button } from "antd";
import { usePathname } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import { useSidebar } from "@/context/sidebar-context";
import { useTransacoes } from "@/hooks/use-transacoes";
import {
  parseValorNumerico,
  getCurrentUser,
  formatarDataApi,
  getBase64,
} from "@/libs/utils/transacoes_helper";
import ModalTransacao from "@/components/features/modals/modal_transacao";

export default function Topbar() {
  const { message } = App.useApp();
  const { criarTransacao, creating } = useTransacoes();
  const { isMobile, setIsOpen } = useSidebar();

  const [modalOpen, setModalOpen] = useState(false);
  const [tipoTransacao, setTipoTransacao] = useState<"entrada" | "saida">("entrada");
  const [nomeUsuario, setNomeUsuario] = useState<string>("Usuário");

  const pathname = usePathname();

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.nome) {
      setNomeUsuario(user.nome);
    }
  }, []);

  const handleCloseModal = () => setModalOpen(false);

  const handleActionOpen = (type: "entrada" | "saida") => {
    setTipoTransacao(type);
    setModalOpen(true);
  };

  const handleSaveNewTransacao = async (values: any) => {
    try {
      const user = getCurrentUser();
      if (!user) {
        message.error("Usuário não encontrado. Por favor, faça login novamente.");
        return;
      }

      const valorNumerico = parseValorNumerico(values.valor);
      if (isNaN(valorNumerico)) {
        message.error("Por favor, insira um valor numérico válido.");
        return;
      }

      let notaFiscalBase64 = undefined;
      if (values.nota_fiscal && values.nota_fiscal.length > 0) {
        const fileObj = values.nota_fiscal[0].originFileObj;

        if (fileObj) {
          notaFiscalBase64 = await getBase64(fileObj);
        } else {
          notaFiscalBase64 = values.nota_fiscal[0].name || values.nota_fiscal[0].url;
        }
      }

      await criarTransacao({
        usuarioId: user.id,
        tipo: tipoTransacao.toUpperCase(),
        descricao: values.descricao,
        valor: valorNumerico,
        categoria: values.categoria,
        data_agendamento: formatarDataApi(values.agendamento),
        nota_fiscal: notaFiscalBase64,
      });

      message.success(`${tipoTransacao === "entrada" ? "Receita" : "Despesa"} criada com sucesso!`);

      handleCloseModal();
    } catch (err: any) {
      message.error(err.message || "Erro ao criar transação.");
    }
  };

  const getTitle = () => {
    if (pathname === "/") return "Dashboard";
    const routeSegment = pathname.split("/")[1] || "";
    return routeSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const userInitial = nomeUsuario.charAt(0).toUpperCase();

  return (
    <div className="py-md gap-md border-border/40 bg-background/90 sticky top-0 z-40 flex flex-col items-stretch justify-between border-b backdrop-blur-md md:flex-row md:items-center">
      {/* Lado Esquerdo: Gatilho Mobile + Título Dinâmico */}
      <div className="gap-sm flex items-center">
        {isMobile && (
          <Button
            icon={<MenuOutlined />}
            onClick={() => setIsOpen(true)}
            className="bg-primary text-primary-foreground border-none shadow-sm hover:opacity-90"
          />
        )}
        <h1 className="text-foreground text-2xl font-bold tracking-tight">{getTitle()}</h1>
      </div>

      {/* Lado Direito: Ações Rápidas + Avatar */}
      <div className="gap-md flex w-full items-center self-end md:w-auto md:self-auto">
        <div className="gap-sm grid w-full grid-cols-2 md:w-auto">
          <Button
            className="border-border text-foreground bg-background-secondary hover:bg-border/20 w-full md:w-auto"
            onClick={() => handleActionOpen("entrada")}
            size="large"
          >
            Nova Receita
          </Button>
          <Button
            type="primary"
            className="bg-primary text-primary-foreground w-full md:w-auto"
            onClick={() => handleActionOpen("saida")}
            size="large"
          >
            Nova Despesa
          </Button>
        </div>

        {/* Perfil do Usuário */}
        <div className="gap-sm pl-md border-border hidden items-center border-l sm:flex">
          <Avatar className="bg-primary-muted text-primary font-semibold shadow-inner">
            {userInitial}
          </Avatar>
          <span className="text-foreground-secondary text-sm font-medium">{nomeUsuario}</span>
        </div>
      </div>

      <ModalTransacao
        isModalOpen={modalOpen}
        handleOk={handleSaveNewTransacao}
        handleCancel={handleCloseModal}
        tipo="novo"
        tipoTransacao={tipoTransacao}
        loading={creating}
      />
    </div>
  );
}
