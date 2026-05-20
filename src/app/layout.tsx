// app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getDynamicThemeStyles } from "@/styles/theme/colors/colors";
import Providers from "@/components/ui/provider"

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Bytebank",
  description: "Secure internet banking applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <style dangerouslySetInnerHTML={{ __html: getDynamicThemeStyles() }} />
      </head>
      <body className="h-full antialiased">
        <AntdRegistry>
          <Providers>
            {children}
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}