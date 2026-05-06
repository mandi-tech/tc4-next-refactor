"use client";

import Card from "@/components/card";
import GraficoDonuts from "@/components/graficos/donuts";
import GraficoLinhasBarras, {
  ChartConfig,
} from "@/components/graficos/linhas_barras";
import Tabela from "@/components/tabela";
import { colunasTransacao, dataMock } from "@/utils/tabela_transacao";
import { BankOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons";

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
        <Tabela
          titulo="Transações Recentes"
          columns={colunasTransacao}
          dataSource={dataMock}
        />
      </div>
    </>
  );
}
