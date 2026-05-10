import {
  AppstoreOutlined,
  DollarOutlined,
  FileSyncOutlined,
  GiftOutlined,
  HomeOutlined,
  LaptopOutlined,
  MedicineBoxOutlined,
  ReadOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
} from "@ant-design/icons";

export const statusTransacao = [
  {
    label: "Pago",
    color: "border-azul text-azul bg-azul/20",
  },
  {
    label: "Pendente",
    color: "border-amarelo text-amarelo bg-amarelo/20",
  },
  {
    label: "Recebido",
    color: "border-verde text-verde bg-verde/20",
  },
];

export const tipoEntrada = [
  {
    key: "entrada-salario",
    tipo: "Salário",
    icone: <DollarOutlined />,
  },
  {
    key: "entrada-freelance",
    tipo: "Freelance",
    icone: <LaptopOutlined />,
  },
  {
    key: "entrada-investimentos",
    tipo: "Investimentos",
    icone: <RiseOutlined />,
  },
  {
    key: "entrada-presente",
    tipo: "Presente",
    icone: <GiftOutlined />,
  },
  {
    key: "entrada-reembolso",
    tipo: "Reembolso",
    icone: <FileSyncOutlined />,
  },
  {
    key: "entrada-outros",
    tipo: "Outros",
    icone: <AppstoreOutlined />,
  },
];

export const tipoSaida = [
  {
    key: "saida-educacao",
    tipo: "Educação",
    icone: <ReadOutlined />,
  },
  {
    key: "saida-alimentacao",
    tipo: "Alimentação",
    icone: <ShoppingCartOutlined />,
  },
  {
    key: "saida-saude",
    tipo: "Saúde",
    icone: <MedicineBoxOutlined />,
  },
  {
    key: "saida-entretenimento",
    tipo: "Entretenimento",
    icone: <SmileOutlined />,
  },
  {
    key: "saida-contas",
    tipo: "Contas",
    icone: <HomeOutlined />,
  },
  {
    key: "saida-outros",
    tipo: "Outros",
    icone: <AppstoreOutlined />,
  },
];

export interface iTransacao {
  id: string;
  data: string;
  tipo: string;
  categoria: string;
  status: string;
  valor: number;
  nota_fiscal?: string;
  descricao: string;
}
