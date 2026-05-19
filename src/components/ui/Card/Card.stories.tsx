import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import {
  WalletOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const meta: Meta<typeof Card> = {
  title: "Components/UI/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[360px]">
        <Story />
      </div>
    ),
  ],
  args: {
    icon: <WalletOutlined />,
    description: "Total Balance",
    value: "R$ 15.230,00",
    loading: false,
    border: false,
    color: "foreground",
    backgroundColor: "background-secondary",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// 1. Cenário Padrão: Saldo Geral
export const Default: Story = {};

// 2. Cenário de Entrada: Lucros/Receitas (Herdando a cor 'success' organicamente)
export const Income: Story = {
  args: {
    icon: <ArrowUpOutlined />,
    description: "Monthly Income",
    value: "R$ 4.300,00",
    color: "success",
    border: true,
  },
};

// 3. Cenário de Saída: Despesas/Gastos (Herdando a cor 'danger')
export const Expenses: Story = {
  args: {
    icon: <ArrowDownOutlined />,
    description: "Monthly Expenses",
    value: "R$ 1.250,00",
    color: "danger",
    border: true,
  },
};

// 4. Cenário com Borda Customizada por Token
export const CustomBorder: Story = {
  args: {
    icon: <CreditCardOutlined />,
    description: "Credit Card Limit",
    value: "R$ 8.000,00",
    color: "primary",
    border: "primary",
  },
};

// 5. Cenário de Carregamento (Skeleton Screen do Antd)
export const Loading: Story = {
  args: {
    loading: true,
  },
};