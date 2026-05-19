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

            await criarTransacao({
                usuarioId: user.id,
                tipo: tipoTransacao.toUpperCase(),
                descricao: values.descricao,
                valor: valorNumerico,
                categoria: values.categoria,
                data_agendamento: formatarDataApi(values.agendamento),
                nota_fiscal: values.nota_fiscal?.[0]?.name,
            });

            message.success(
                `${tipoTransacao === "entrada" ? "Receita" : "Despesa"} criada com sucesso!`
            );

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
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center py-md gap-md border-b border-border/40 bg-background/90 backdrop-blur-md sticky top-0 z-40">
            {/* Lado Esquerdo: Gatilho Mobile + Título Dinâmico */}
            <div className="flex items-center gap-sm">
                {isMobile && (
                    <Button
                        icon={<MenuOutlined />}
                        onClick={() => setIsOpen(true)}
                        className="bg-primary text-primary-foreground border-none shadow-sm hover:opacity-90"
                    />
                )}
                <h1 className="text-2xl font-bold text-foreground tracking-tight">{getTitle()}</h1>
            </div>

            {/* Lado Direito: Ações Rápidas + Avatar */}
            <div className="flex items-center gap-md self-end md:self-auto w-full md:w-auto">
                <div className="grid grid-cols-2 gap-sm w-full md:w-auto">
                    <Button
                        className="w-full md:w-auto border-border text-foreground bg-background-secondary hover:bg-border/20"
                        onClick={() => handleActionOpen("entrada")}
                        size="large"
                    >
                        Nova Receita
                    </Button>
                    <Button
                        type="primary"
                        className="w-full md:w-auto bg-primary text-primary-foreground"
                        onClick={() => handleActionOpen("saida")}
                        size="large"
                    >
                        Nova Despesa
                    </Button>
                </div>

                {/* Perfil do Usuário (Ocultado em telas muito pequenas) */}
                <div className="hidden sm:flex items-center gap-sm border-l pl-md border-border">
                    <Avatar className="bg-primary-muted text-primary font-semibold shadow-inner">
                        {userInitial}
                    </Avatar>
                    <span className="text-sm font-medium text-foreground-secondary">{nomeUsuario}</span>
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