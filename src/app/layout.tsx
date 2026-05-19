"use client";

import React from "react";
import { ConfigProvider, App as AntdApp } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getDynamicThemeStyles } from "@/styles/theme/colors";
import theme from "@/styles/theme/theme";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <AntdRegistry>
            <ConfigProvider theme={theme}>
                <AntdApp className="h-full">
                    <style dangerouslySetInnerHTML={{ __html: getDynamicThemeStyles() }} />
                    {children}
                </AntdApp>
            </ConfigProvider>
        </AntdRegistry>
    );
}