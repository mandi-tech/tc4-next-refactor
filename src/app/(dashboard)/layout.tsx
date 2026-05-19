import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { manrope } from "@/styles/fonts";
import Providers from "@/components/ui/provider";
import { SidebarProvider } from "@/context/sidebar-context";
import AuthGuard from "@/components/auth/auth-guard";
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
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-primary/20">
        <Providers>
          <AuthGuard>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                {/* Menu Lateral Fixo/Retrátil */}
                <SidebarMenu />
                {/* Área de Conteúdo Principal */}
                <main className="flex flex-col flex-1 px-md md:px-xl py-md h-screen overflow-y-auto content-stable">
                  <Topbar />
                  <div className="flex-1 w-full max-w-7xl mx-auto">
                    {children}
                  </div>
                </main>
              </div>
            </SidebarProvider>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}