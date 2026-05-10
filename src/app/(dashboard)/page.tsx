"use client";

import Filtros from "@/components/features/filtros/filtros";
import Card from "@/components/ui/card";
import GraficoDonuts from "@/components/ui/graficos/donuts";
import GraficoLinhasBarras, {
  ChartConfig,
} from "@/components/ui/graficos/linhas_barras";
import Tabela from "@/components/ui/tabela";
import { colunasTransacao, dataMock } from "@/libs/utils/tabela_transacao";
import {
  ArrowRightOutlined,
  BankOutlined,
  FallOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import Link from "next/link";

export default function Home() {
  const mockData = [
    { mes: "Jan", renda: 4000, saldo: 2400, gastos: 150 },
    { mes: "Fev", renda: 3000, saldo: 1398, gastos: 340 },
    { mes: "Mar", renda: 2000, saldo: 9800, gastos: 650 },
    { mes: "Abr", renda: 2780, saldo: 3908, gastos: 10 },
  ];

  const chartConfigs: ChartConfig[] = [
    {
      key: "renda",
      label: "Renda",
      color: "var(--amarelo)",
      type: "bar",
    },
    {
      key: "gastos",
      label: "Gastos",
      color: "var(--rosa)",
      type: "bar",
    },
    {
      key: "saldo",
      label: "Saldo Final",
      color: "var(--lavanda)",
      type: "line",
    },
  ];

  const stats = [
    { name: "Alimentação", value: 400 },
    { name: "Jogos", value: 300 },
    { name: "Luz", value: 100 },
  ];

  return (
    <>
      <div className="flex flex-col gap-8">
        <Filtros filtros={["periodo"]} />
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <Card
            icone={<BankOutlined />}
            descricao="Saldo Total"
            valor="R$ 4.000,00"
            backgroundColor="azul"
            color="cinza"
          />
          <Card
            icone={<RiseOutlined />}
            descricao="Receita Mensal"
            valor="R$ 5.000,00"
            backgroundColor="verde"
            color="branco"
          />
          <Card
            icone={<FallOutlined />}
            descricao="Desepesa Mensal"
            valor="R$ 1.000,00"
            backgroundColor="rosa"
            color="branco"
          />
        </section>
        <section className="grid grid-cols-8 gap-6">
          <GraficoLinhasBarras
            data={mockData}
            configs={chartConfigs}
            xAxisKey="mes"
            titulo="Análise de Receita"
            className="col-span-8 xl:col-span-5"
          />
          <GraficoDonuts
            data={stats}
            className="col-span-8 xl:col-span-3"
            titulo="Distribuição de Gastos"
          />
        </section>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-secondaryForeground">
              Transações Recentes
            </h3>
            <Link
              href={"/extrato"}
              className="text-lavanda text-md font-semibold flex gap-2 items-center"
            >
              Visualizar extrato
              <ArrowRightOutlined />
            </Link>
          </div>

          <Table
            columns={colunasTransacao}
            dataSource={dataMock}
            pagination={false}
            rowKey="id"
          />
        </div>
      </div>
    </>
  );
}
