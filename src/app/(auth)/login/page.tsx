"use client";

import LoginForm from "@/components/auth/LoginForm/LoginForm";
import React from "react";

export default function LoginPage() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-background text-foreground px-md">
      <div className="w-full sm:w-[480px] flex flex-col items-stretch gap-lg p-xl rounded-xl shadow-md bg-background-secondary border border-border">
        <header className="flex flex-col gap-xxs text-center">
          <h1 className="font-bold text-5xl text-primary tracking-tight mb-xxs">
            ByteBank
          </h1>
          <p className="text-sm text-foreground-secondary">
            Acesse sua conta para gerenciar suas finanças
          </p>
        </header>
        <LoginForm />
      </div>
    </section>
  );
}