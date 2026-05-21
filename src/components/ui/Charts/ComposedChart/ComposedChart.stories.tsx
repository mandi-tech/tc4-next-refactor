import type { Meta, StoryObj } from "@storybook/react";
import { ConfigProvider, App as AntdApp } from "antd";
import theme from "@/styles/theme/theme";
import ComposedChart from "./ComposedChart";

const meta: Meta<typeof ComposedChart> = {
    title: "Components/UI/Charts/ComposedChart",
    component: ComposedChart,
    decorators: [
        (Story) => (
            <ConfigProvider theme={theme}>
                <AntdApp>
                    <div style={{ width: '100%', height: '400px', minHeight: '400px', display: 'block', position: 'relative' }}>
                        <Story />
                    </div>
                </AntdApp>
            </ConfigProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ComposedChart>;

const mockFinancialData = [
    { mes: "Jan", entradas: 3500, saidas: 2100, balanco: 1400 },
    { mes: "Fev", entradas: 4200, saidas: 2800, balanco: 1400 },
    { mes: "Mar", entradas: 3900, saidas: 3100, balanco: 800 },
    { mes: "Abr", entradas: 5800, saidas: 3900, balanco: 1900 },
    { mes: "Mai", entradas: 5100, saidas: 4200, balanco: 900 },
    { mes: "Jun", entradas: 6500, saidas: 3800, balanco: 2700 },
];

export const HistoricoTransacoes: Story = {
    args: {
        title: "Análise de Entradas vs Saídas",
        xAxisKey: "mes",
        data: mockFinancialData,
        loading: false,
        configs: [
            {
                key: "entradas",
                label: "Entradas (R$)",
                color: "#52c41a",
                type: "bar",
            },
            {
                key: "saidas",
                label: "Saídas (R$)",
                color: "#ff4d4f",
                type: "bar",
            },
            {
                key: "balanco",
                label: "Balanço do Saldo (R$)",
                color: "#1890ff",
                type: "line",
            },
        ],
    },
};

export const EstadoCarregando: Story = {
    args: {
        title: "Análise de Entradas vs Saídas",
        xAxisKey: "mes",
        data: [],
        configs: [],
        loading: true,
    },
};