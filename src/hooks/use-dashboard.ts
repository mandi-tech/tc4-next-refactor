import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  GET_METRICAS,
  GET_ANALISE_EXTRATO,
  GET_SAIDAS_POR_CATEGORIA,
  MetricasResponse,
  AnaliseExtratoResponse,
  SaidasPorCategoriaResponse,
  DashboardVariables,
} from "@/graphql/queries/dashboard";
import {
  GET_TRANSACOES,
  TransacoesResponse,
  TransacoesVariables,
} from "@/graphql/queries/transacoes";
import { getCurrentUser } from "@/libs/utils/transacoes_helper";
import { ChartConfig } from "@/components/ui/Charts/types";
import { transactionTriggerVar } from "@/libs/apollo-client";
import { useQuery, useReactiveVar } from "@apollo/client/react";

export function useDashboard() {
  const searchParams = useSearchParams();
  const [usuarioId, setUsuarioId] = useState<string>("");
  const trigger = useReactiveVar(transactionTriggerVar);

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.id) setUsuarioId(user.id);
  }, []);

  const dataInicial = searchParams.get("data_inicial") || undefined;
  const dataFinal = searchParams.get("data_final") || undefined;

  const baseVariables = useMemo(
    () => ({
      usuarioId,
      data_inicial: dataInicial,
      data_final: dataFinal,
    }),
    [usuarioId, dataInicial, dataFinal],
  );

  // 1. Query de Métricas 
  const { data: metricasData, loading: loadingMetricas, refetch: refetchMetricas } = useQuery<
    MetricasResponse,
    DashboardVariables
  >(GET_METRICAS, { variables: baseVariables, skip: !usuarioId });

  // 2. Query do Gráfico de Transações
  const { data: analiseData, loading: loadingAnalise, refetch: refetchAnalise } = useQuery<
    AnaliseExtratoResponse,
    DashboardVariables
  >(GET_ANALISE_EXTRATO, { variables: baseVariables, skip: !usuarioId });

  // 3. Query do Gráfico de Despesas por Categorias
  const { data: categoriasData, loading: loadingCategorias, refetch: refetchCategorias } = useQuery<
    SaidasPorCategoriaResponse,
    DashboardVariables
  >(GET_SAIDAS_POR_CATEGORIA, { variables: baseVariables, skip: !usuarioId });

  // 4. Query das Últimas Transações
  const { data: transacoesData, loading: loadingTransacoes, refetch: refetchTransacoes } = useQuery<
    TransacoesResponse,
    TransacoesVariables
  >(GET_TRANSACOES, {
    variables: {
      usuarioId,
      tamanho_pagina: 5,
      data_inicial: dataInicial,
      data_final: dataFinal,
    },
    skip: !usuarioId,
  });

  // Efeito reativo para escutar transações criadas/deletadas e atualizar o dashboard em tempo real
  useEffect(() => {
    if (trigger > 0 && usuarioId) {
      refetchMetricas().catch(console.error);
      refetchAnalise().catch(console.error);
      refetchCategorias().catch(console.error);
      refetchTransacoes().catch(console.error);
    }
  }, [trigger, usuarioId, refetchMetricas, refetchAnalise, refetchCategorias, refetchTransacoes]);

  // Mapeamento: Dados do Gráfico de Linhas/Barras
  const chartData = useMemo(() => {
    return (
      analiseData?.analiseExtrato.map((item) => ({
        mes: item.data,
        renda: item.entrada,
        gastos: item.saida,
        saldo: item.saldo,
      })) || []
    );
  }, [analiseData]);

  // Mapeamento: Dados do Gráfico de Donuts
  const donutData = useMemo(() => {
    return (
      categoriasData?.saidasPorCategoria.map((item) => ({
        name: item.categoria,
        value: item.quantidade,
        porcentagem: item.porcentagem,
      })) || []
    );
  }, [categoriasData]);

  const chartConfigs: ChartConfig[] = [
    { key: "renda", label: "Entradas", color: "var(--color-success)", type: "bar" },
    { key: "gastos", label: "Saídas", color: "var(--color-danger)", type: "bar" },
    { key: "saldo", label: "Saldo Acumulado", color: "var(--color-primary)", type: "line" },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return {
    metricas: {
      saldo: formatCurrency(metricasData?.metricas.saldo || 0),
      totalEntrada: formatCurrency(metricasData?.metricas.total_entrada || 0),
      totalSaida: formatCurrency(metricasData?.metricas.total_saida || 0),
      loading: loadingMetricas,
    },
    chart: {
      data: chartData,
      configs: chartConfigs,
      loading: loadingAnalise,
    },
    donut: {
      data: donutData,
      loading: loadingCategorias,
    },
    transacoes: {
      recentes: transacoesData?.transacoesPorUsuario.transacoes || [],
      loading: loadingTransacoes,
    },
    filtrosData: {
      dataInicial,
      dataFinal,
    },
  };
}
