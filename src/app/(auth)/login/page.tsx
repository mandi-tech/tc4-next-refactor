"use client";

import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const { login, loginLoading } = useAuth();

  const onFinish = (values: any) => {
    login(values.email, values.senha);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col items-center gap-6 px-10 py-12 rounded-lg shadow-lg bg-white dark:bg-zinc-900">
        <h1 className="font-bold text-5xl text-blue-600">ByteBank</h1>
        <Form
          layout="vertical"
          className="w-full"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira um email válido." },
              { type: "email", message: "O formato do email é inválido." },
            ]}
          >
            <Input size="large" placeholder="seu@email.com" />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: "Por favor, insira a senha." }]}
          >
            <Input.Password size="large" placeholder="Sua senha" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 text-lg font-semibold"
              loading={loginLoading}
            >
              Entrar
            </Button>
          </Form.Item>
          <div className="text-center">
            <span>
              Não possui uma conta?
              <Link href={"/novo_usuario"} className="text-blue-600 hover:underline"> Crie aqui!</Link>
            </span>
          </div>
        </Form>
      </div>
    </section>
  );
}
