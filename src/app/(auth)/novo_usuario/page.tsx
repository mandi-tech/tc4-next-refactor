"use client";

import RegisterForm from "@/components/features/auth/RegisterForm/RegisterForm";
import React from "react";

export default function RegisterPage() {
  return (
    <section className="bg-background text-foreground px-md flex h-screen w-full items-center justify-center">
      <div className="gap-lg p-xl bg-background-secondary border-border flex w-full flex-col items-stretch rounded-xl border shadow-md sm:w-[480px]">
        <header className="gap-xxs flex flex-col text-center">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">Crie uma conta</h1>
          <p className="text-foreground-secondary text-sm">
            Comece a gerenciar suas finanças de forma inteligente
          </p>
        </header>
        <RegisterForm />
      </div>
    </section>
  );
}
