"use client";

import Filtros from "@/components/features/filtros/filtros";
import Card from "@/components/ui/card";
import GraficoDonuts from "@/components/ui/graficos/donuts";
import GraficoLinhasBarras, {
  ChartConfig,
} from "@/components/ui/graficos/linhas_barras";
import { colunasTransacao } from "@/libs/utils/tabela_transacao";
import {
  ArrowRightOutlined,
  BankOutlined,
  FallOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Table, Spin } from "antd";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { 
  GET_METRICAS, 
  GET_ANALISE_EXTRATO, 
  GET_SAIDAS_POR_CATEGORIA,
  MetricasResponse,
  AnaliseExtratoResponse,
  SaidasPorCategoriaResponse,
  DashboardVariables
} from "@/graphql/queries/dashboard";
import { 
  GET_TRANSACOES, 
  TransacoesResponse, 
  TransacoesVariables 
} from "@/graphql/queries/transacoes";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  
  // Get user from localStorage
  const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userStr ? JSON.parse(userStr) : null;
  const usuarioId = user?.id || "";

  const dataInicial = searchParams.get("data_inicial") || undefined;
  const dataFinal = searchParams.get("data_final") || undefined;

  // Queries
  const { data: metricasData, loading: loadingMetricas } = useQuery<MetricasResponse, DashboardVariables>(
    GET_METRICAS, 
    { variables: { usuarioId, data_inicial: dataInicial, data_final: dataFinal }, skip: !usuarioId }
  );

  const { data: analiseData, loading: loadingAnalise } = useQuery<AnaliseExtratoResponse, DashboardVariables>(
    GET_ANALISE_EXTRATO, 
    { variables: { usuarioId, data_inicial: dataInicial, data_final: dataFinal }, skip: !usuarioId }
  );

  const { data: categoriasData, loading: loadingCategorias } = useQuery<SaidasPorCategoriaResponse, DashboardVariables>(
    GET_SAIDAS_POR_CATEGORIA, 
    { variables: { usuarioId, data_inicial: dataInicial, data_final: dataFinal }, skip: !usuarioId }
  );

  const { data: transacoesData, loading: loadingTransacoes } = useQuery<TransacoesResponse, TransacoesVariables>(
    GET_TRANSACOES,
    { 
      variables: { 
        usuarioId, 
        tamanho_pagina: 5,
        data_inicial: dataInicial,
        data_final: dataFinal
      }, 
      skip: !usuarioId 
    }
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };
  const chartData = analiseData?.analiseExtrato.map(item => ({
    mes: item.data,
    renda: item.entrada,
    gastos: item.saida,
    saldo: item.saldo
  })) || [];

  const donutData = categoriasData?.saidasPorCategoria.map(item => ({
    name: item.categoria,
    value: item.quantidade,
    porcentagem: item.porcentagem
  })) || [];

  const transacoesRecentes = transacoesData?.transacoesPorUsuario.transacoes || [];
  const chartConfigs: ChartConfig[] = [
    {
      key: "renda",
      label: "Entradas",
      color: "var(--verde)",
      type: "bar",
    },
    {
      key: "gastos",
      label: "Saídas",
      color: "var(--rosa)",
      type: "bar",
    },
    {
      key: "saldo",
      label: "Saldo Acumulado",
      color: "var(--lavanda)",
      type: "line",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-8">
        <Filtros filtros={["periodo"]} />
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <Card
            icone={<BankOutlined />}
            descricao="Saldo Total"
            valor={formatCurrency(metricasData?.metricas.saldo || 0)}
            backgroundColor="azul"
            color="cinza"
            loading={loadingMetricas}
          />
          <Card
            icone={<RiseOutlined />}
            descricao="Receita Mensal"
            valor={formatCurrency(metricasData?.metricas.total_entrada || 0)}
            backgroundColor="verde"
            color="branco"
            loading={loadingMetricas}
          />
          <Card
            icone={<FallOutlined />}
            descricao="Despesa Mensal"
            valor={formatCurrency(metricasData?.metricas.total_saida || 0)}
            backgroundColor="rosa"
            color="branco"
            loading={loadingMetricas}
          />
        </section>
        <section className="grid grid-cols-8 gap-6">
          <GraficoLinhasBarras
            data={chartData}
            configs={chartConfigs}
            xAxisKey="mes"
            titulo="Análise Financeira Diária"
            className="col-span-8 xl:col-span-5"
            loading={loadingAnalise}
          />
          <GraficoDonuts
            data={donutData}
            className="col-span-8 xl:col-span-3"
            titulo="Distribuição de Gastos por Categoria"
            loading={loadingCategorias}
          />
        </section>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-secondaryForeground">
              Transações Recentes
            </h3>
            <Link
              href={{
                pathname: "/extrato",
                query: {
                  ...(dataInicial && { data_inicial: dataInicial }),
                  ...(dataFinal && { data_final: dataFinal }),
                },
              }}
              className="text-lavanda text-md font-semibold flex gap-2 items-center"
            >
              Visualizar extrato
              <ArrowRightOutlined />
            </Link>
          </div>

          <Table
            columns={colunasTransacao}
            dataSource={transacoesRecentes}
            pagination={false}
            rowKey="id"
            loading={loadingTransacoes}
          />
        </div>
      </div>
    </>
  );
}
