import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DonutChart from "./DonutChart";

const meta: Meta<typeof DonutChart> = {
    title: "Components/UI/DonutChart",
    component: DonutChart,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <div className="w-full max-w-md p-md bg-background text-foreground">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

const mockExpensesData = [
    { name: "Housing", value: 2500 },
    { name: "Food & Grocery", value: 1200 },
    { name: "Transport", value: 450 },
    { name: "Entertainment", value: 300 },
    { name: "Subscriptions", value: 150 },
];

// 1. Cenário Padrão: Distribuição de Despesas
export const Default: Story = {
    args: {
        title: "Expenses by Category",
        data: mockExpensesData,
    },
};

// 2. Cenário de Carregamento (Exibindo Skeletons circulares personalizados)
export const Loading: Story = {
    args: {
        title: "Expenses by Category",
        data: [],
        loading: true,
    },
};

// 3. Cenário Sem Título Integrado
export const WithoutTitle: Story = {
    args: {
        data: [
            { name: "Active Projects", value: 8 },
            { name: "On Hold", value: 2 },
            { name: "Completed", value: 14 },
        ],
    },
};

// 4. Cenário com Cores Customizadas Injetadas por Propriedade
export const CustomColors: Story = {
    args: {
        title: "Investment Portfolio",
        data: [
            { name: "Stocks", value: 60 },
            { name: "Fixed Income", value: 30 },
            { name: "Crypto", value: 10 },
        ],
        colors: ["#10b981", "#3b82f6", "#f59e0b"],
    },
};