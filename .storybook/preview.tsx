// .storybook/preview.tsx
import React from "react";
import type { Preview } from "@storybook/react";
import { ConfigProvider, App as AntdApp } from "antd";
import theme from "../src/styles/theme/theme";
import { getDynamicThemeStyles, lightPalette } from "../src/styles/theme/colors/colors";
import { SidebarProvider } from "../src/context/sidebar-context";

// Importações do Apollo Client para alimentar as requisições de API
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

// @ts-ignore
import "../src/styles/globals.css";

// Inicialização do cliente de testes
const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const mockApolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
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
        // 1. Injetamos o Provedor do Apollo de forma global
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
                  className={`${currentTheme} bg-background text-foreground w-full p-md min-h-screen`}
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

export default preview;