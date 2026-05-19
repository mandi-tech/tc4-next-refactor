import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";
import { ConfigProvider, App as AntdApp } from "antd";
import theme from "@/styles/theme/theme";

const meta: Meta<typeof RegisterForm> = {
    title: "Features/Auth/RegisterForm",
    component: RegisterForm,
    decorators: [
        (Story) => (
            <ConfigProvider theme={theme}>
                <AntdApp>
                    <div className="w-full max-w-[480px] p-xl rounded-xl border border-border bg-background-secondary shadow-md mx-auto my-xl">
                        <Story />
                    </div>
                </AntdApp>
            </ConfigProvider>
        ),
    ],
    args: {
        onSubmitOverride: (values) => console.log("Cadastro enviado no Storybook:", values),
    },
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

// Cenário 1: Formulário limpo e pronto para preenchimento
export const Default: Story = {
    args: {
        isLoadingOverride: false,
    },
};

// Cenário 2: Exibe o esqueleto visual do botão carregando a requisição da API
export const Loading: Story = {
    args: {
        isLoadingOverride: true,
    },
};