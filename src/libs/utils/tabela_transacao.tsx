import { iTransacao, statusTransacao } from "@/libs/types/iTransacoes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

interface AcoesProps {
  onEdit: (record: iTransacao) => void;
  onDelete: (id: string) => void;
}

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

export const getColunasExtrato = ({ onEdit, onDelete }: AcoesProps) => [
  ...colunasTransacao,
  {
    title: "Ações",
    key: "acoes",
    render: (_: any, record: iTransacao) => {
      return (
        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(record)} // Passa o objeto completo
            className="!bg-azul !text-branco"
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Deseja excluir a transação?"
            onConfirm={() => onDelete(record.id)} // Passa apenas o ID
            okText="Sim"
            cancelText="Não"
          >
            <Button
              className="!bg-vermelho !text-branco border !border-vermelho"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      );
    },
  },
];

export const dataMock: iTransacao[] = [
  {
    id: "1",
    data: "01/05/2026",
    categoria: "Alimentação",
    status: "Pago",
    valor: 85.5,
    descricao: "Almoço executivo",
    tipo: "entrada",
  },
  {
    id: "2",
    data: "02/05/2026",
    categoria: "Transporte",
    status: "Pendente",
    valor: 42,
    descricao: "Uber trabalho",
    tipo: "saida",
  },
  {
    id: "3",
    data: "05/05/2026",
    categoria: "Assinaturas",
    status: "Pago",
    valor: 39.9,
    descricao: "Netflix",
    tipo: "entrada",
  },
];
