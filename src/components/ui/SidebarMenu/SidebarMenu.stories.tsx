import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SidebarMenu from "./SidebarMenu";
import { SidebarProvider } from "@/context/sidebar-context";

const meta: Meta<typeof SidebarMenu> = {
    title: "Components/UI/SidebarMenu",
    component: SidebarMenu,
    parameters: {
        layout: "fullscreen",
        nextjs: {
            appDirectory: true,
            navigation: {
            pathname: "/",
        },
        },
    },
    decorators: [
        (Story) => (
            <SidebarProvider>
                {/* Envelopado em uma div de tela cheia para simular o comportamento real no app */}
                <div className="h-screen w-full flex bg-background text-foreground">
                    <Story />
                    <div className="p-xl flex-1 bg-background border-l border-border">
                        <h2 className="text-xl font-bold mb-md">Application Content Area</h2>
                        <p className="text-foreground-secondary text-sm">
                            This space simulates where the pages (Dashboard, Statement) are rendered alongside the Sidebar.
                        </p>
                    </div>
                </div>
            </SidebarProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

// 1. Cenário Padrão: Sidebar em visualização de Desktop
export const Desktop: Story = {};

// 2. Cenário Mobile: Simula a visualização em telas menores (Drawer)
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1",
        },
    },
};