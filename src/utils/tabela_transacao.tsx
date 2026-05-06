import { iTransacao, statusTransacao } from "@/types/iTransacoes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const colunasTransacao = [
  {
    title: "Data agendamento",
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
    render: (item: string) => {
      const status = statusTransacao.find((s) => s.label === item);

      const classes = status?.color || "border-azul text-cinza bg-cinza/30";

      return (
        <span
          className={`${classes} border-2 text-sm font-bold rounded-2xl px-3 py-1`}
        >
          {item}
        </span>
      );
    },
  },
  {
    title: "Valor",
    dataIndex: "valor",
    key: "valor",
    render: (item: number) => {
      const valorFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item);

      const corTexto = item < 0 ? "text-vermelho" : "text-verde";

      return <p className={`font-bold ${corTexto}`}>{valorFormatado}</p>;
    },
  },
];

export const colunasExtrato = [
  ...colunasTransacao,
  {
    title: "",
    dataIndex: "categoria",
    key: "categoria",
    render: (_: any, record: iTransacao) => {
      return (
        <div className="flex gap-2">
          <Button
            onClick={() => console.log("Deletar", record)}
            className="!bg-azul !text-branco"
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => console.log("Deletar", record)}
            className="!bg-vermelho !text-branco border !border-vermelho"
          >
            <DeleteOutlined />
          </Button>
        </div>
      );
    },
  },
];

export const dataMock = [
  {
    key: "1",
    data: "01/05/2026",
    categoria: "Alimentação",
    status: "Pago",
    valor: 85.5,
  },
  {
    key: "2",
    data: "02/05/2026",
    categoria: "Transporte",
    status: "Pendente",
    valor: -42,
  },
  {
    key: "3",
    data: "05/05/2026",
    categoria: "Assinaturas",
    status: "Pago",
    valor: 39.9,
  },
  {
    key: "4",
    data: "10/05/2026",
    categoria: "Lazer",
    status: "Recebido",
    valor: 150,
  },
  {
    key: "5",
    data: "12/05/2026",
    categoria: "Educação",
    status: "Pago",
    valor: 450,
  },
  {
    key: "6",
    data: "15/05/2026",
    categoria: "Saúde",
    status: "Pago",
    valor: 120,
  },
  {
    key: "7",
    data: "18/05/2026",
    categoria: "Moradia",
    status: "Pendente",
    valor: 1200,
  },
  {
    key: "8",
    data: "20/05/2026",
    categoria: "Supermercado",
    status: "Pago",
    valor: 325.15,
  },
  {
    key: "9",
    data: "22/05/2026",
    categoria: "Vestuário",
    status: "Pago",
    valor: 89.9,
  },
  {
    key: "10",
    data: "25/05/2026",
    categoria: "Investimentos",
    status: "Pendente",
    valor: 500,
  },
];
