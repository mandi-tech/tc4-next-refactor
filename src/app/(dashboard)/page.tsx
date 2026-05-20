"use client";

import React from "react";
import Link from "next/link";
import { Table } from "antd";
import { ArrowRightOutlined, BankOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons";

import Filtros from "@/components/features/filtros/filtros";
import Card from "@/components/ui/Card/Card";
import { colunasTransacao } from "@/libs/utils/tabela_transacao";
import { useDashboard } from "@/hooks/use-dashboard";
import ComposedChart from "@/components/ui/Charts/ComposedChart/ComposedChart";
import DonutChart from "@/components/ui/Charts/DonutChart/DonutChart";

export default function Home() {
  const { metricas, chart, donut, transacoes, filtrosData } = useDashboard();

  return (
    <div className="gap-xl flex flex-col">
      <Filtros filtros={["periodo"]} />

      {/* Grid de Cards de Indicadores Financeiros */}
      <section className="gap-md grid w-full grid-cols-1 lg:grid-cols-3">
        <Card
          icon={<BankOutlined />}
          description="Saldo Total"
          value={metricas.saldo}
          backgroundColor="primary-muted"
          color="primary"
          loading={metricas.loading}
        />
        <Card
          icon={<RiseOutlined />}
          description="Receita Mensal"
          value={metricas.totalEntrada}
          backgroundColor="success-muted"
          color="success"
          loading={metricas.loading}
        />
        <Card
          icon={<FallOutlined />}
          description="Despesa Mensal"
          value={metricas.totalSaida}
          backgroundColor="danger-muted"
          color="danger"
          loading={metricas.loading}
        />
      </section>

      {/* Grid Central de Gráficos Analíticos */}
      <section className="gap-md grid grid-cols-8">
        <ComposedChart
          data={chart.data}
          configs={chart.configs}
          xAxisKey="mes"
          title="Análise Financeira Diária"
          className="col-span-8 xl:col-span-5"
          loading={chart.loading}
        />
        <DonutChart
          data={donut.data}
          title="Distribuição de Gastos por Categoria"
          className="col-span-8 xl:col-span-3"
          loading={donut.loading}
        />
      </section>

      {/* Seção de Resumo de Atividades Recentes */}
      <div className="gap-sm flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-xl font-semibold tracking-tight">
            Transações Recentes
          </h3>
          <Link
            href={{
              pathname: "/extrato",
              query: {
                ...(filtrosData.dataInicial && { data_inicial: filtrosData.dataInicial }),
                ...(filtrosData.dataFinal && { data_final: filtrosData.dataFinal }),
              },
            }}
            className="text-primary hover:text-primary-hover gap-xs flex items-center text-sm font-semibold transition-colors"
          >
            <span className="hidden md:inline">Visualizar extrato</span>
            <ArrowRightOutlined className="text-xs" />
          </Link>
        </div>

        <div className="border-border bg-background-secondary w-full overflow-x-auto rounded-xl border shadow-sm">
          <Table
            columns={colunasTransacao}
            dataSource={transacoes.recentes}
            pagination={false}
            rowKey="id"
            loading={transacoes.loading}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
