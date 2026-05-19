import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Topbar from "./Topbar";
import { SidebarProvider } from "@/context/sidebar-context";
import { App as AntdApp } from "antd";

if (typeof window !== "undefined") {
    const mockUser = { id: "user-123", nome: "Isabelle Silva" };
    window.localStorage.setItem("user", JSON.stringify(mockUser));
}

const meta: Meta<typeof Topbar> = {
    title: "Components/UI/Topbar",
    component: Topbar,
    parameters: {
        layout: "fullscreen",
        nextjs: {
        appDirectory: true,
        navigation: {
            pathname: "/dashboard",
        },
        },
    },
    decorators: [
        (Story) => (
        <AntdApp>
            <SidebarProvider>
            <div className="w-full min-h-[150px] px-lg bg-background text-foreground">
                <Story />
            </div>
            </SidebarProvider>
        </AntdApp>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Topbar>;

// 1. Cenário Padrão (Exibição em Desktop Corporativo)
export const Desktop: Story = {};

// 2. Cenário em Rota Alternativa (Mudando dinamicamente o título através dos parâmetros do Next.js)
export const CustomRouteTitle: Story = {
    parameters: {
        nextjs: {
        navigation: {
            pathname: "/credit-cards",
        },
        },
    },
};

// 3. Cenário Mobile (Gatilho de Hamburguer Visível)
export const MobileView: Story = {
    parameters: {
        viewport: {
        defaultViewport: "mobile1",
        },
    },
};