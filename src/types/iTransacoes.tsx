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
    color: "border-azul text-azul bg-azul/30",
  },
  {
    label: "Pendente",
    color: "border-amarelo text-amarelo bg-amarelo/20",
  },
  {
    label: "Recebido",
    color: "border-verde text-verde bg-verde/30",
  },
];

export const tipoEntrada = [
  {
    tipo: "Salário",
    icone: <DollarOutlined />,
  },
  {
    tipo: "Freelance",
    icone: <LaptopOutlined />,
  },
  {
    tipo: "Investimentos",
    icone: <RiseOutlined />,
  },
  {
    tipo: "Presente",
    icone: <GiftOutlined />,
  },
  {
    tipo: "Reembolso",
    icone: <FileSyncOutlined />,
  },
  {
    tipo: "Outros",
    icone: <AppstoreOutlined />,
  },
];

export const tipoSaida = [
  {
    tipo: "Educação",
    icone: <ReadOutlined />,
  },
  {
    tipo: "Alimentação",
    icone: <ShoppingCartOutlined />,
  },
  {
    tipo: "Saúde",
    icone: <MedicineBoxOutlined />,
  },
  {
    tipo: "Entretenimento",
    icone: <SmileOutlined />,
  },
  {
    tipo: "Contas",
    icone: <HomeOutlined />,
  },
  {
    tipo: "Outros",
    icone: <AppstoreOutlined />,
  },
];

export interface iTransacao {
  key: string;
  data: string;
  categoria: string;
  status: string;
  valor: number;
  nota_fiscal?: string;
  descricao: string;
}
