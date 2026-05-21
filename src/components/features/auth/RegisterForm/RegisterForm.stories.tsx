import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";

const meta: Meta<typeof RegisterForm> = {
  title: "Components/Features/Auth/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="border-border bg-background-secondary my-xl mx-auto w-full max-w-[480px] rounded-xl border p-xl shadow-md">
        <Story />
      </div>
    ),
  ],
  args: {
    onSubmitOverride: (values) => console.log("Cadastro enviado no Storybook:", values),
  },
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  args: {
    isLoadingOverride: false,
  },
};

export const Loading: Story = {
  args: {
    isLoadingOverride: true,
  },
};