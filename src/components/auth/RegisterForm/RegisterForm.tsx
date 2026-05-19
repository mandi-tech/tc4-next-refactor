"use client";

import React from "react";
import Link from "next/link";
import { Divider, Form, Input, Alert, App } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useAuth } from "@/hooks/use-auth";
import Button from "@/components/ui/Button/Button";
import {
    validarEmail,
    validarSenha,
    validarNomeCompleto,
} from "@/libs/utils/validadores";

interface RegisterFormProps {
    onSubmitOverride?: (name: string, email: string, string: string) => Promise<void> | void;
    isLoadingOverride?: boolean;
}

interface RegisterValues {
    name: string;
    email: string;
    password: string;
}

export default function RegisterForm({ 
    onSubmitOverride, 
    isLoadingOverride 
}: RegisterFormProps) {
    const { message } = App.useApp();
    const { register, registerLoading } = useAuth();

    const activeLoading = isLoadingOverride ?? registerLoading;
    const activeRegister = onSubmitOverride ?? register;

    const handleFinish = async (values: RegisterValues) => {
        try {
            await activeRegister(values.name, values.email, values.password);
            message.success("Conta criada com sucesso! Faça login para continuar.");
        } catch (err: any) {
            message.error(err.message || "Ocorreu um erro ao criar sua conta.");
        }
    };

    return (
        <Form
            layout="vertical"
            className="w-full"
            onFinish={handleFinish}
            requiredMark={false}
        >
            {/* Nome Completo */}
            <Form.Item
                label="Nome completo"
                name="name"
                rules={[
                    { required: true, message: "Por favor, insira seu nome completo." },
                    {
                        validator: (_, value) => validarNomeCompleto(value)
                            ? Promise.resolve()
                            : Promise.reject(new Error("Por favor, insira um nome completo válido.")),
                    },
                ]}
            >
                <Input size="large" placeholder="John Doe" className="h-10 w-full" />
            </Form.Item>

            {/* E-mail */}
            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                    { required: true, message: "Por favor, insira seu e-mail." },
                    {
                        validator: (_, value) => validarEmail(value)
                            ? Promise.resolve()
                            : Promise.reject(new Error("Por favor, insira um endereço de e-mail válido.")),
                    },
                ]}
            >
                <Input size="large" placeholder="seu@email.com" className="h-10 w-full" />
            </Form.Item>

            <Divider className="my-md border-border/60" />

            {/* Informativo de Requisitos de Segurança */}
            <Alert
                message={<span className="font-bold text-sm text-foreground">Requisitos da senha</span>}
                description={
                    <ul className="list-disc pl-sm text-xs flex flex-col gap-xxs mt-xxs text-foreground-secondary">
                        <li>Deve conter pelo menos 6 caracteres</li>
                        <li>Deve conter pelo menos um número</li>
                        <li>Deve conter pelo menos uma letra maiúscula</li>
                        <li>Deve conter pelo menos um caractere especial</li>
                    </ul>
                }
                type="info"
                showIcon
                className="mb-md bg-primary-muted/20 border-primary-muted"
            />

            {/* Senha */}
            <Form.Item
                label="Senha"
                name="password"
                rules={[
                    { required: true, message: "Por favor, insira sua senha." },
                    {
                        validator: (_, value) => validarSenha(value)
                            ? Promise.resolve()
                            : Promise.reject(new Error("Sua senha deve atender aos requisitos de segurança.")),
                    },
                ]}
            >
                <Input.Password
                    size="large"
                    placeholder="Crie uma senha segura"
                    className="h-10 w-full"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            {/* Ação Principal */}
            <Form.Item className="mt-lg mb-xs">
                <Button
                    htmlType="submit"
                    fullWidth
                    loading={activeLoading}
                    className="text-base font-semibold"
                >
                    Cadastrar
                </Button>
            </Form.Item>

            {/* Link de Retorno */}
            <div className="text-center text-sm text-foreground-secondary mt-sm">
                <span>Já tem uma conta? </span>
                <Link
                    href="/login"
                    className="text-primary font-medium hover:text-primary-hover hover:underline transition-colors whitespace-nowrap"
                >
                    Faça login aqui!
                </Link>
            </div>
        </Form>
    );
}