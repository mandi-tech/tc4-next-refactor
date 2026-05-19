import React from "react";
import "@/styles/globals.css";
import { manrope } from "@/styles/fonts";
import theme from "@/styles/theme/theme";
import { ConfigProvider, App as AntdApp } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getDynamicThemeStyles } from "@/styles/theme/colors";

export const metadata = {
    title: "Meu App Financeiro",
    description: "Nova arquitetura refatorada",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
    }) {
    return (
        <html lang="pt-BR" className={manrope.variable}>
        <head>
            <style dangerouslySetInnerHTML={{ __html: getDynamicThemeStyles() }} />
        </head>
        <body className="font-sans bg-background text-foreground min-h-screen antialiased">
            <AntdRegistry>
            <ConfigProvider theme={theme}>
                <AntdApp>
                {children}
                </AntdApp>
            </ConfigProvider>
            </AntdRegistry>
        </body>
        </html>
    );
}