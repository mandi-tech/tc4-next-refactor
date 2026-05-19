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
    <div className="flex flex-col gap-xl">
      <Filtros filtros={["periodo"]} />

      {/* Grid de Cards de Indicadores Financeiros */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-md w-full">
        <Card
          icon={<BankOutlined />}
          description="Saldo Total"
          value={metricas.saldo}
          backgroundColor="var(--color-primary-muted)"
          color="var(--color-primary)"
          loading={metricas.loading}
        />
        <Card
          icon={<RiseOutlined />}
          description="Receita Mensal"
          value={metricas.totalEntrada}
          backgroundColor="var(--color-success-muted)"
          color="var(--color-success)"
          loading={metricas.loading}
        />
        <Card
          icon={<FallOutlined />}
          description="Despesa Mensal"
          value={metricas.totalSaida}
          backgroundColor="var(--color-danger-muted)"
          color="var(--color-danger)"
          loading={metricas.loading}
        />
      </section>

      {/* Grid Central de Gráficos Analíticos */}
      <section className="grid grid-cols-8 gap-md">
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
      <div className="flex flex-col gap-sm">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-foreground tracking-tight">
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
            className="text-primary hover:text-primary-hover text-sm font-semibold flex gap-xs items-center transition-colors"
          >
            <span className="hidden md:inline">Visualizar extrato</span>
            <ArrowRightOutlined className="text-xs" />
          </Link>
        </div>

        <div className="w-full overflow-x-auto border border-border shadow-sm rounded-xl bg-background-secondary">
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