"use client";

import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import React from "react";

export default function RegisterPage() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-background text-foreground px-md">
      <div className="w-full sm:w-[480px] flex flex-col items-stretch gap-lg p-xl rounded-xl shadow-md bg-background-secondary border border-border">
        <header className="flex flex-col gap-xxs text-center">
          <h1 className="font-bold text-3xl tracking-tight text-foreground">
            Crie uma conta
          </h1>
          <p className="text-sm text-foreground-secondary">
            Comece a gerenciar suas finanças de forma inteligente
          </p>
        </header>
        <RegisterForm />
      </div>
    </section>
  );
}