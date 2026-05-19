"use client";

import React from "react";
import { Form, Input } from "antd";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import Button from "@/components/ui/Button/Button";

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login, loginLoading } = useAuth();

  const handleFinish = (values: LoginValues) => {
    login(values.email, values.password);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-background text-foreground px-md">
      <div className="w-full sm:w-[480px] flex flex-col items-stretch gap-lg p-xl rounded-xl shadow-lg bg-background-secondary border border-border">
        
        {/* Título */}
        <h1 className="font-bold text-5xl text-primary tracking-tight text-center mb-xs">
          ByteBank
        </h1>

        <Form
          layout="vertical"
          className="w-full"
          onFinish={handleFinish}
          requiredMark={false}
        >
          {/* Campo de Email */}
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira seu e-mail." },
              { type: "email", message: "O formato do e-mail é inválido." },
            ]}
          >
            <Input size="large" placeholder="seu@email.com" className="h-10 w-full" />
          </Form.Item>

          {/* Campo de Senha */}
          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: "Por favor, insira sua senha." }]}
          >
            <Input.Password size="large" placeholder="Sua senha" className="h-10 w-full" />
          </Form.Item>

          {/* Botão de Submit */}
          <Form.Item className="mt-lg mb-xs">
            <Button
              htmlType="submit"
              fullWidth
              loading={loginLoading}
              className="text-base"
            >
              Entrar
            </Button>
          </Form.Item>

          {/* Link para criar conta */}
          <div className="text-center text-sm text-foreground-secondary mt-sm">
            <span>Não tem uma conta? </span>
            <Link 
              href="/novo_usuario" 
              className="text-primary font-medium hover:underline transition-colors whitespace-nowrap"
            >
              Cadastre-se aqui!
            </Link>
          </div>
        </Form>
      </div>
    </section>
  );
}