"use client";

import React from "react";
import { Divider, Form, Input, Alert, App } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import Button from "@/components/ui/Button/Button";

import {
  validarEmail,
  validarSenha,
  validarNomeCompleto,
} from "@/libs/utils/validadores";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const { message } = App.useApp();
  const { register, registerLoading } = useAuth();

  const handleFinish = async (values: RegisterValues) => {
    try {
      await register(values.name, values.email, values.password);
      message.success("Account created successfully! Please sign in to continue.");
    } catch (err: any) {
      message.error(err.message || "An error occurred while creating your account.");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-background text-foreground px-md">
      <div className="w-full sm:w-[480px] flex flex-col items-stretch gap-lg p-xl rounded-xl shadow-lg bg-background-secondary border border-border">
        
        <h1 className="font-bold text-3xl tracking-tight text-center">
          Crie uma conta
        </h1>

        <Form
          layout="vertical"
          className="w-full"
          onFinish={handleFinish}
          requiredMark={false}
        >
          {/* Campo de Nome */}
          <Form.Item
            label="Nome completo"
            name="name"
            rules={[
              { required: true, message: "Por favor, insira seu nome completo." },
              {
                validator: (_, value) =>
                  validarNomeCompleto(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error("Por favor, insira um nome completo válido.")),
              },
            ]}
          >
            <Input size="large" placeholder="John Doe" className="h-10 w-full" />
          </Form.Item>

          {/* Campo de Email */}
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira seu e-mail." },
              {
                validator: (_, value) =>
                  validarEmail(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error("Por favor, insira um endereço de e-mail válido.")),
              },
            ]}
          >
            <Input size="large" placeholder="seu@email.com" className="h-10 w-full" />
          </Form.Item>

          <Divider className="my-md" />

          {/* Banner de Instruções de Segurança da Senha */}
          <Alert
            title={<h5 className="font-bold text-sm">Password requirements</h5>}
            description={
              <ul className="list-disc pl-sm text-xs flex flex-col gap-xxs mt-xxs">
                <li>Deve conter pelo menos 6 caracteres</li>
                <li>Deve conter pelo menos um número</li>
                <li>Deve conter pelo menos uma letra maiúscula</li>
                <li>Deve conter pelo menos um caractere especial</li>
              </ul>
            }
            type="info"
            showIcon
            className="mb-md"
          />

          {/* Campo de Senha */}
          <Form.Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: "Por favor, insira sua senha." },
              {
                validator: (_, value) =>
                  validarSenha(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "Sua senha deve atender aos requisitos de segurança.",
                        ),
                      ),
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Crie uma senha segura"
              className="h-10 w-full"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* Botão de Cadastro */}
          <Form.Item className="mt-lg mb-xs">
            <Button
              htmlType="submit"
              fullWidth
              loading={registerLoading}
              className="text-base"
            >
              Cadastrar
            </Button>
          </Form.Item>

          {/* Link de retorno para a tela de Login */}
          <div className="text-center text-sm text-foreground-secondary mt-sm">
            <span>Já tem uma conta? </span>
            <Link 
              href="/login" 
              className="text-primary font-medium hover:underline transition-colors whitespace-nowrap"
            >
              Faça login aqui!
            </Link>
          </div>
        </Form>
      </div>
    </section>
  );
}