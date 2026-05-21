import { Transacao } from "@/graphql/queries/transacoes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Image } from "antd";

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
      return categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();
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

      const corTexto = dados.tipo === "SAIDA" ? "text-red-500" : "text-green-500";

      return <p className={`font-bold ${corTexto}`}>{valorFormatado}</p>;
    },
  },
  {
    title: "Nota Fiscal",
    dataIndex: "nota_fiscal",
    key: "nota_fiscal",
    render: (nota_fiscal: string) => {
      if (nota_fiscal && nota_fiscal.startsWith("data:image")) {
        return (
          <Image
            src={nota_fiscal}
            alt="Nota Fiscal"
            width={40}
            height={40}
            className="rounded object-cover"
          />
        );
      }
      return <span className="text-sm text-gray-400">Sem anexo</span>;
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
              className="!bg-vermelho !text-branco !border-vermelho border"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      );
    },
  },
];
