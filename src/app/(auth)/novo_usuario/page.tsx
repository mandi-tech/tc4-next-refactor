"use client";

import {
  validarEmail,
  validarSenha,
  validarNomeCompleto,
} from "@/libs/utils/validadores";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Divider, Form, Input, Alert, message } from "antd";
import { useAuth } from "@/hooks/use-auth";

export default function NovoUsuarioPage() {
  const { registrar, registerLoading } = useAuth();

  const onFinish = async (values: any) => {
    try {
      await registrar(values.nome, values.email, values.senha);
      message.success("Usuário criado com sucesso! Faça login para continuar.");
    } catch (err: any) {
      message.error(err.message || "Erro ao criar usuário.");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-[30%] flex flex-col items-center gap-6  px-10 py-15 rounded-lg shadow-lg">
        <h1 className="font-bold text-3xl">Novo usuário</h1>
        <Form
          layout="vertical"
          className="w-full gap-2 items-center justify-center"
          onFinish={onFinish}
        >
          <Form.Item
            label="Nome completo"
            name="nome"
            rules={[
              { required: true, message: "Por favor, insira um nome válido." },
              {
                validator: (_, value) =>
                  validarNomeCompleto(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Por favor, insira um nome válido."),
                      ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira um email." },
              {
                validator: (_, value) =>
                  validarEmail(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Por favor, insira um email válido."),
                      ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Divider />
          <Alert
            title={
              <h5 className="text-bold text-md">Regras para criar senha</h5>
            }
            description={
              <ul className="text-xs">
                <li>Deve ter pelo menos 6 dígitos</li>
                <li>Deve conter números</li>
                <li>Deve conter pelo menos uma letra maiúscula</li>
                <li>Deve conter pelo menos um caractere especial</li>
              </ul>
            }
            type="info"
            showIcon
            className="mb-2!"
          />
          <Form.Item
            label="Senha"
            name="senha"
            rules={[
              { required: true, message: "Por favor, insira a senha." },
              {
                validator: (_, value) =>
                  validarSenha(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "A senha deve ter 6 dígitos, maiúscula, minúscula, número e caractere especial.",
                        ),
                      ),
              },
            ]}
          >
            <Input.Password
              type="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={registerLoading}>
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
