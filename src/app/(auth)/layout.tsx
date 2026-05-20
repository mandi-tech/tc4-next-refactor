import type { Metadata } from "next";
import { manrope } from "@/styles/theme/typhography/typhography";

export const metadata: Metadata = {
  title: "Bytebank - Autenticação",
  description: "Faça login ou crie sua conta no Bytebank",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${manrope.variable} font-sans bg-background text-foreground antialiased min-h-screen w-full`}>
      <main>{children}</main>
    </div>
  );
}