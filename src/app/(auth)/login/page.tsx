"use client";

import { Button, Form, Input } from "antd";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-[30%] flex flex-col items-center gap-6  px-10 py-15 rounded-lg shadow-lg">
        <h1 className="font-bold text-5xl">ByteBank</h1>
        <Form
          layout="vertical"
          className="w-full gap-2 items-center justify-center"
        >
          <Form.Item
            label="Email"
            rules={[
              { required: true, message: "Por favor, insira um email válido." },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Senha"
            rules={[{ required: true, message: "Por favor, insira a senha." }]}
          >
            <Input placeholder="Senha" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Log In
            </Button>
          </Form.Item>
          <span className="">
            Não possui uma conta?
            <Link href={"/novo_usuario"}> Crie aqui!</Link>
          </span>
        </Form>
      </div>
    </section>
  );
}
