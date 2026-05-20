import React, { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SidebarMenu from "./SidebarMenu";
import { SidebarProvider } from "@/context/sidebar-context";
import { ConfigProvider, App as AntdApp } from "antd";
import theme from "@/styles/theme/theme";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import { getDynamicThemeStyles } from "@/styles/theme/colors/colors";
import { ApolloProvider } from "@apollo/client/react";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const mockApolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

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
    (Story) => {
      useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

        const root = document.documentElement;
        if (isDark) {
          root.classList.add("dark");
          root.setAttribute("data-theme", "dark");
        } else {
          root.classList.remove("dark");
          root.setAttribute("data-theme", "light");
        }
      }, []);

      return (
        <ApolloProvider client={mockApolloClient}>
          <style dangerouslySetInnerHTML={{ __html: getDynamicThemeStyles() }} />

          <ConfigProvider theme={theme}>
            <AntdApp>
              <SidebarProvider>
                <div className="bg-background text-foreground flex h-screen w-full">
                  <Story />
                  <div className="p-xl bg-background border-border flex-1 border-l">
                    <h1 className="text-primary mb-md text-2xl font-bold tracking-tight">
                      ByteBank Dashboard
                    </h1>
                    <h2 className="mb-md text-xl font-bold text-foreground">Application Content Area</h2>
                    <p className="text-foreground-secondary text-sm">
                      Este espaço simula onde as páginas são renderizadas ao lado do Menu.
                    </p>
                  </div>
                </div>
              </SidebarProvider>
            </AntdApp>
          </ConfigProvider>
        </ApolloProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

export const Desktop: Story = {};
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};