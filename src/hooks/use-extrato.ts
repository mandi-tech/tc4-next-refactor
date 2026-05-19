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
    const [transacaoSelecionada, setTransacaoSelecionada] = useState<Transacao | undefined>(undefined);
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
        [usuarioId, tipo, data_inicial, data_final, categoriaId, paginaAtual, tamanhoPagina]
    );

    // Query do GraphQL
    const { data, loading, refetch } = useQuery<TransacoesResponse, TransacoesVariables>(
        GET_TRANSACOES,
        {
            variables,
            skip: !usuarioId,
            fetchPolicy: "cache-and-network",
        }
    );

    // Mutations
    const [criarTransacao, { loading: creating }] = useMutation<CriarTransacaoResponse, CriarTransacaoVariables>(
        CRIAR_TRANSACAO,
        {
            onCompleted: async () => {
                notification.success({ message: "Transação criada com sucesso!" }); // Corrigido de 'title' para 'message' padrão do AntD
                await refetch();
            },
        }
    );

    const [editarTransacao, { loading: updating }] = useMutation<EditarTransacaoResponse, EditarTransacaoVariables>(
        EDITAR_TRANSACAO,
        {
            onCompleted: () => {
                notification.success({ message: "Transação atualizada com sucesso!" });
                refetch();
            },
        }
    );

    const [deletarTransacao] = useMutation<DeletarTransacaoResponse, DeletarTransacaoVariables>(
        DELETAR_TRANSACAO,
        {
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
        }
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
                message: "Valor inválido",
                description: "Por favor, insira um valor numérico válido.",
            });
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

        const commonVariables = {
            tipo: transacaoSelecionada
                ? transacaoSelecionada.tipo
                : searchParams.get("tipo")?.toUpperCase() || "ENTRADA",
            descricao: values.descricao,
            valor: valorNumerico,
            categoria: values.categoria,
            data_agendamento: formatarDataApi(values.agendamento),
            nota_fiscal: notaFiscalBase64,
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