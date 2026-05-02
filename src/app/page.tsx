"use client";

import Card from "@/components/card";
import GraficoDonuts from "@/components/graficos/donuts";
import GraficoLinhasBarras, {
  ChartConfig,
} from "@/components/graficos/linhas_barras";
import ModalEntrada from "@/components/modals/modal_entrada";
import Tabela from "@/components/tabela";
import { BankOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

export default function Home() {
  const [entradaOpen, setEntradaOpen] = useState(false);
  const [saidaOpen, setSaidaOpen] = useState(false);

  const handleEntradaOpen = () => {
    setEntradaOpen(!entradaOpen);
  };

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
    { name: "Nubank", value: 400 },
    { name: "Inter", value: 300 },
    { name: "Dinheiro", value: 100 },
  ];

  const columns = [
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
    },
  ];

  const data = [
    {
      key: "1",
      data: "01/05/2026",
      categoria: "Alimentação",
      status: "Pago",
      valor: "R$ 85,50",
    },
    {
      key: "2",
      data: "02/05/2026",
      categoria: "Transporte",
      status: "Pendente",
      valor: "R$ 42,00",
    },
    {
      key: "3",
      data: "05/05/2026",
      categoria: "Assinaturas",
      status: "Pago",
      valor: "R$ 39,90",
    },
    {
      key: "4",
      data: "10/05/2026",
      categoria: "Lazer",
      status: "Cancelado",
      valor: "R$ 150,00",
    },
    {
      key: "5",
      data: "12/05/2026",
      categoria: "Educação",
      status: "Pago",
      valor: "R$ 450,00",
    },
    {
      key: "6",
      data: "15/05/2026",
      categoria: "Saúde",
      status: "Pago",
      valor: "R$ 120,00",
    },
    {
      key: "7",
      data: "18/05/2026",
      categoria: "Moradia",
      status: "Pendente",
      valor: "R$ 1.200,00",
    },
    {
      key: "8",
      data: "20/05/2026",
      categoria: "Supermercado",
      status: "Pago",
      valor: "R$ 325,15",
    },
    {
      key: "9",
      data: "22/05/2026",
      categoria: "Vestuário",
      status: "Pago",
      valor: "R$ 89,90",
    },
    {
      key: "10",
      data: "25/05/2026",
      categoria: "Investimentos",
      status: "Pendente",
      valor: "R$ 500,00",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <Card
            icone={<BankOutlined />}
            descricao="Saldo Total"
            valor="fi8943y8943"
            backgroundColor="azul"
            color="cinza "
            footer={
              <div className="flex flex-col md:flex-row gap-2">
                <Button className="w-full" onClick={handleEntradaOpen}>
                  Nova Entrada
                </Button>
                <Button
                  variant="outlined"
                  className="w-full"
                  onClick={handleEntradaOpen}
                >
                  Nova Saída
                </Button>
              </div>
            }
          />
          <Card
            icone={<RiseOutlined />}
            descricao="Renda Mensal"
            valor="fi8943y8943"
            backgroundColor="verde"
            color="branco"
          />
          <Card
            icone={<FallOutlined />}
            descricao="Desepesas Mensais"
            valor="fi8943y8943"
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
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      <ModalEntrada
        isModalOpen={entradaOpen}
        handleOk={() => {}}
        handleCancel={handleEntradaOpen}
      />
    </>
  );
}
