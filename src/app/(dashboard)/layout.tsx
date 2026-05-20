import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { manrope } from "@/styles/theme/typhography/typhography";
import Providers from "@/components/ui/provider";
import { SidebarProvider } from "@/context/sidebar-context";
import AuthGuard from "@/components/features/auth/auth-guard";
import SidebarMenu from "@/components/ui/SidebarMenu/SidebarMenu";
import Topbar from "@/components/ui/Topbar/Topbar";

export const metadata: Metadata = {
  title: "Bytebank",
  description: "Seu banco digital inteligente",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-br" className={`${manrope.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground selection:bg-primary/20 min-h-screen antialiased">
        <Providers>
          <AuthGuard>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                {/* Menu Lateral Fixo/Retrátil */}
                <SidebarMenu />
                {/* Área de Conteúdo Principal */}
                <main className="px-md md:px-xl py-md content-stable flex h-screen flex-1 flex-col overflow-y-auto">
                  <Topbar />
                  <div className="mx-auto w-full max-w-7xl flex-1 mt-lg">{children}</div>
                </main>
              </div>
            </SidebarProvider>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
