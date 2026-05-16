import { Transacao } from "@/graphql/queries/transacoes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { iTransacao, tipoSaida } from "../types/iTransacoes";

interface AcoesProps {
  onEdit: (record: Transacao) => void;
  onDelete: (id: string) => void;
}

export const colunasTransacao = [
  {
    title: "Data agendamento",
    dataIndex: "data_agendamento",
    key: "data_agendamento",
  },
  {
    title: "Descrição",
    dataIndex: "descricao",
    key: "descricao",
  },
  {
    title: "Categoria",
    dataIndex: "categoria",
    key: "categoria",
    render: (categoria: string) => {
      if (!categoria) return "";
      return (
        categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()
      );
    },
  },
  {
    title: "Valor",
    dataIndex: "valor",
    key: "valor",
    render: (item: number, dados: Transacao) => {
      const valorFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item);

      const corTexto = dados.tipo === "SAIDA" ? "text-vermelho" : "text-verde";

      return <p className={`font-bold ${corTexto}`}>{valorFormatado}</p>;
    },
  },
];

export const getColunasExtrato = ({ onEdit, onDelete }: AcoesProps) => [
  ...colunasTransacao,
  {
    title: "Ações",
    key: "acoes",
    render: (_: any, record: Transacao) => {
      return (
        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(record)}
            className="!bg-azul !text-branco"
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Deseja excluir a transação?"
            onConfirm={() => onDelete(record.id)}
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
