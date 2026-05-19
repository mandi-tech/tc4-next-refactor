import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface TransactionData {
  key: string;
  description: string;
  category: string;
  date: string;
  amount: string;
  type: "income" | "expense";
}

const meta: Meta<typeof Table> = {
  title: "Components/UI/Table",
  component: Table,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-lg bg-background text-foreground w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Table>;

const columnsMock: ColumnsType<TransactionData> = [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    className: "font-medium",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category: string) => <Tag color="blue">{category}</Tag>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "right",
    // Agora o TypeScript sabe perfeitamente que 'record' é um 'TransactionData'
    render: (amount: string, record) => (
      <span
        className={
          record.type === "income" ? "text-success font-semibold" : "text-danger font-semibold"
        }
      >
        {record.type === "income" ? `+ ${amount}` : `- ${amount}`}
      </span>
    ),
  },
];

const dataSourceMock: TransactionData[] = [
  {
    key: "1",
    description: "Cloud Hosting Services",
    category: "Infrastructure",
    date: "May 18, 2026",
    amount: "$ 142.00",
    type: "expense",
  },
  {
    key: "2",
    description: "Client Project Invoicing",
    category: "Development",
    date: "May 15, 2026",
    amount: "$ 4,250.00",
    type: "income",
  },
  {
    key: "3",
    description: "UI/UX Software Subscription",
    category: "Design Tools",
    date: "May 12, 2026",
    amount: "$ 49.00",
    type: "expense",
  },
];

// 1. Cenário Padrão
export const Default: Story = {
  args: {
    title: "Recent Transactions",
    columns: columnsMock as any,
    dataSource: dataSourceMock,
    pagination: { pageSize: 3, hideOnSinglePage: true },
  },
};

// 2. Cenário de Carregamento
export const Loading: Story = {
  args: {
    title: "Recent Transactions",
    columns: columnsMock as any,
    dataSource: [],
    loading: true,
  },
};

// 3. Cenário Sem Título
export const WithoutTitle: Story = {
  args: {
    columns: columnsMock as any,
    dataSource: dataSourceMock,
    pagination: false,
  },
};
