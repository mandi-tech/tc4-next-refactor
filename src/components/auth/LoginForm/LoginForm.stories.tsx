import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./LoginForm";
import { ConfigProvider, App as AntdApp } from "antd";
import theme from "@/styles/theme/theme";

const meta: Meta<typeof LoginForm> = {
    title: "Features/Auth/LoginForm",
    component: LoginForm,
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
        onSubmitOverride: (values) => console.log("Login submetido no Storybook:", values),
    },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

// Cenário 1: Formulário limpo e pronto para uso
export const Default: Story = {
    args: {
        isLoadingOverride: false,
    },
};

// Cenário 2: Simulando o botão travado no estado de carregamento da API
export const Loading: Story = {
    args: {
        isLoadingOverride: true,
    },
};