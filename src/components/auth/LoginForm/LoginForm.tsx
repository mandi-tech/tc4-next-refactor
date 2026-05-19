// src/components/features/auth/LoginForm.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Form, Input } from "antd";
import { useAuth } from "@/hooks/use-auth";
import Button from "@/components/ui/Button/Button";

interface LoginFormProps {
    onSubmitOverride?: (values: any) => void;
    isLoadingOverride?: boolean;
}

interface LoginValues {
    email: string;
    password: string;
}

export default function LoginForm({ 
    onSubmitOverride, 
    isLoadingOverride 
}: LoginFormProps) {
    const { login, loginLoading } = useAuth();

    const activeLoading = isLoadingOverride ?? loginLoading;
    const activeSubmit = onSubmitOverride ?? login;

    const handleFinish = (values: LoginValues) => {
        activeSubmit(values.email, values.password);
    };

    return (
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
                    loading={activeLoading}
                    className="text-base font-semibold"
                >
                    Entrar
                </Button>
            </Form.Item>

            {/* Link para criar conta */}
            <div className="text-center text-sm text-foreground-secondary mt-sm">
                <span>Não tem uma conta? </span>
                <Link
                    href="/register"
                    className="text-primary font-medium hover:text-primary-hover hover:underline transition-colors whitespace-nowrap"
                >
                    Cadastre-se aqui!
                </Link>
            </div>
        </Form>
    );
}