import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Components/Features/Auth/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="border-border bg-background-secondary my-xl mx-auto w-full max-w-[480px] rounded-xl border p-xl shadow-md">
        <Story />
      </div>
    ),
  ],
  args: {
    onSubmitOverride: (values) => console.log("Login submetido no Storybook:", values),
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

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