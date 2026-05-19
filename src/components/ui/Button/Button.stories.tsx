import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
    title: "Components/UI/Button",
    component: Button,
    tags: ["autodocs"], // Gera documentação automática na aba do Storybook
    args: {
        children: "Cadastrar",
        fullWidth: false,
        loading: false,
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Cenário 1: Botão padrão
export const Default: Story = {};

// Cenário 2: Botão em estado de carregamento
export const Loading: Story = {
    args: {
        loading: true,
    },
};

// Cenário 3: Botão ocupando 100% da largura do container
export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};