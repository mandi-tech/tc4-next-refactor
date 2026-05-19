import type { Meta, StoryObj } from "@storybook/react";
import { ConfigProvider, App as AntdApp } from "antd";
import theme from "@/styles/theme/theme";
import DonutChart from "./DonutChart";

const meta: Meta<typeof DonutChart> = {
  title: "Components/UI/Charts/DonutChart",
  component: DonutChart,
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
type Story = StoryObj<typeof DonutChart>;

const mockDonutData = [
  { name: "Renda Fixa", value: 45000 },
  { name: "Ações", value: 25000 },
  { name: "Fundos Imobiliários", value: 15000 },
  { name: "Criptoativos", value: 5000 },
  { name: "Tesouro Direto", value: 10000 },
];

export const Default: Story = {
  args: {
    title: "Alocação de Carteira",
    data: mockDonutData,
    loading: false,
    colors: ["#2b2675", "#52c41a", "#faad14", "#ff4d4f", "#722ed1"],
  },
};

export const Loading: Story = {
  args: {
    title: "Alocação de Carteira",
    data: [],
    loading: true,
  },
};