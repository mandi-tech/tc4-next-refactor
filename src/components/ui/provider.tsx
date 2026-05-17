"use client";

import { useState, useLayoutEffect, useCallback } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import themeConfig from "@/styles/theme/theme";
import { darkPalette, lightPalette } from "@/styles/theme/cores";
import { App } from "antd";
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
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);

    const palette = shouldBeDark ? darkPalette : lightPalette;
    const root = document.documentElement;

    Object.entries(palette).forEach(([key, value]) => {
      const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      root.style.setProperty(cssVarName, value as string);
    });

    if (shouldBeDark) root.classList.add("dark");
    else root.classList.remove("dark");
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
          algorithm: isDark
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
          token: {
            ...themeConfig.token,
            colorPrimary: currentPalette.azul,
            colorSuccess: currentPalette.verde,
            colorError: currentPalette.vermelho,
            colorBgLayout: currentPalette.background,
            colorBgContainer: currentPalette.secondaryBackground,
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
