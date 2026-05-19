"use client";

import React, { useState, useLayoutEffect, useCallback } from "react";
import { ConfigProvider, theme as antdTheme, App } from "antd";
import themeConfig from "@/styles/theme/theme";
import { darkPalette, lightPalette } from "@/styles/theme/colors/colors";
import { setStatic } from "@/libs/utils/antd-static";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/libs/apollo-client";

const StaticInitialization = () => {
  const { message, notification, modal } = App.useApp();
  setStatic(message, notification, modal);
  return null;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const currentPalette = isDark ? darkPalette : lightPalette;

  const applyTheme = useCallback(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);

    const root = document.documentElement;

    if (shouldBeDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, []);

  useLayoutEffect(() => {
    applyTheme();
    window.addEventListener("storage", applyTheme);
    return () => window.removeEventListener("storage", applyTheme);
  }, [applyTheme]);

  return (
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          ...themeConfig,
          algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            ...themeConfig.token,
            colorPrimary: currentPalette.primary,
            colorSuccess: currentPalette.success,
            colorError: currentPalette.danger,
            colorWarning: currentPalette.warning,
            colorBgLayout: currentPalette.background,
            colorBgContainer: currentPalette["background-secondary"],
            colorText: currentPalette.foreground,
          },
        }}
      >
        <App>
          <StaticInitialization />
          {children}
        </App>
      </ConfigProvider>
    </ApolloProvider>
  );
}
