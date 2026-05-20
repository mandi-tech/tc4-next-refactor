import React, { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Topbar from "./Topbar";
import { SidebarProvider } from "@/context/sidebar-context";
import { ConfigProvider, App as AntdApp } from "antd";
import theme from "@/styles/theme/theme";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import { getDynamicThemeStyles, lightPalette } from "@/styles/theme/colors/colors";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const mockApolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

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
        pathname: "/",
      },
    },
  },
  decorators: [
    (Story) => {
      let currentTheme = "light";
      if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        currentTheme = savedTheme === "dark" || (!savedTheme && prefersDark) ? "dark" : "light";

        const root = document.documentElement;
        if (currentTheme === "dark") {
          root.classList.add("dark");
          root.setAttribute("data-theme", "dark");
        } else {
          root.classList.remove("dark");
          root.setAttribute("data-theme", "light");
        }
      }

      return (
        <ApolloProvider client={mockApolloClient}>
          <style dangerouslySetInnerHTML={{ __html: getDynamicThemeStyles() }} />
          <ConfigProvider
            theme={{
              ...theme,
              token: {
                colorPrimary: lightPalette.primary,
                colorBgContainer: lightPalette["background-secondary"],
                colorText: lightPalette.foreground,
                colorBorder: lightPalette.border,
              },
            }}
          >
            <AntdApp>
              <SidebarProvider>
                <div
                  className={`${currentTheme} bg-background text-foreground min-h-[100px] w-full p-md transition-colors duration-300`}
                  data-theme={currentTheme}
                >
                  <Story />
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
type Story = StoryObj<typeof Topbar>;

// 1. Cenário Padrão
export const Desktop: Story = {};

// 2. Cenário em Rota Alternativa
export const ExtratoRouteTitle: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/extrato",
      },
    },
  },
};

// 3. Cenário Mobile
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    nextjs: {
      navigation: {
        pathname: "/dashboard",
      },
    },
  },
};