import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Cadastrar",
    fullWidth: false,
    loading: false,
    disabled: false,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "default", "dashed", "link", "text"],
    },
    size: {
      control: "select",
      options: ["small", "middle", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Cenário 1: Botão padrão do ByteBank
export const Default: Story = {};

// Cenário 2: Botão em estado de carregamento de API
export const Loading: Story = {
  args: {
    loading: true,
  },
};

// Cenário 3: Botão expandido ocupando 100% do container pai
export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};