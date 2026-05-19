import type { Metadata } from "next";
import "@/styles/globals.css";
import { manrope } from "@/styles/theme/typhography/typhography";
import Providers from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "Bytebank",
  description: "Secure internet banking applications",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
