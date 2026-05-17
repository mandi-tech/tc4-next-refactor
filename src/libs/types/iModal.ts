import { Transacao } from "@/graphql/queries/transacoes";

export interface ModalProps {
  isModalOpen: boolean;
  handleOk: (values: any) => void;
  handleCancel: () => void;
}

export interface iModalTransacao extends ModalProps {
  tipoTransacao: "entrada" | "saida";
  tipo: "novo" | "edicao";
  initialData?: Transacao;
  loading?: boolean;
}
