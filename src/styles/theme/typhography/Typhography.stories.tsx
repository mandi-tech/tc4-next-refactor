import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { manrope } from "./typhography";

const TypographyDashboard = () => {
    const pesos = [
        { peso: "200", nome: "Extra Light" },
        { peso: "300", nome: "Light" },
        { peso: "400", nome: "Regular" },
        { peso: "500", nome: "Medium" },
        { peso: "600", nome: "Semi Bold" },
        { peso: "700", font: "Bold", nome: "Bold" },
        { peso: "800", nome: "Extra Bold" },
    ];

    const tamanhos = [
        { classe: "text-xs", px: "12px", label: "Texto de Apoio / Legendas" },
        { classe: "text-sm", px: "14px", label: "Texto de Parágrafo Curto / Labels" },
        { classe: "text-base", px: "16px", label: "Texto Base do Sistema (Padrão)" },
        { classe: "text-lg", px: "18px", label: "Subtítulos Médios" },
        { classe: "text-xl", px: "20px", label: "Títulos de Seções / Cards" },
        { classe: "text-2xl", px: "24px", label: "Títulos de Páginas Menores" },
        { classe: "text-3xl", px: "30px", label: "Grandes Títulos / Dashboards" },
    ];

    return (
        <div className={`${manrope.variable} font-sans p-xl bg-[#f6f7f9] text-[#151720] min-h-screen w-full`}>

            {/* Cabeçalho */}
            <div className="mb-xl">
                <h1 className="text-3xl font-extrabold tracking-tight mb-xs text-[#4d33cc]">
                    ByteBank Typography
                </h1>
                <p className="text-[#151720]/70 text-base">
                    Guia oficial da família tipográfica <strong>Manrope</strong> e sua escala de tamanhos e pesos.
                </p>
            </div>

            {/* Seção 1: Amostra Geral de Alfabeto */}
            <div className="bg-white border border-[#dcdfe5] rounded-xl p-xl shadow-sm mb-xl">
                <h2 className="text-sm font-bold text-[#4d33cc] uppercase tracking-wider mb-md">
                    Amostra da Fonte
                </h2>
                <div className="text-4xl font-light tracking-wide text-[#151720] border-b border-[#f6f7f9] pb-md mb-md break-all">
                    Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 1234567890 &*$%
                </div>
                <p className="text-md text-[#151720]/60 italic">
                    O ByteBank utiliza uma interface digital limpa e foca na clareza financeira. A Manrope é uma fonte geométrica moderna, excelente para legibilidade de números, tabelas e dados sensíveis.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
                {/* Seção 2: Pesos Suportados */}
                <div className="bg-white border border-[#dcdfe5] rounded-xl p-xl shadow-sm">
                    <h2 className="text-sm font-bold text-[#4d33cc] uppercase tracking-wider mb-lg">
                        Pesos de Linha (Weights)
                    </h2>
                    <div className="flex flex-col gap-md">
                        {pesos.map(({ peso, nome }) => (
                            <div key={peso} className="flex items-baseline justify-between border-b border-[#f6f7f9] pb-xs">
                                <span className="text-xs text-[#151720]/40 font-mono w-24">w-{peso} ({nome})</span>
                                <span className="text-xl w-full text-right" style={{ fontWeight: peso }}>
                                    Investimentos e Saldo no ByteBank
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seção 3: Escala de Tamanhos (Type Scale) */}
                <div className="bg-white border border-[#dcdfe5] rounded-xl p-xl shadow-sm">
                    <h2 className="text-sm font-bold text-[#4d33cc] uppercase tracking-wider mb-lg">
                        Escala de Tamanhos (Sizes)
                    </h2>
                    <div className="flex flex-col gap-lg">
                        {tamanhos.map(({ classe, px, label }) => (
                            <div key={classe} className="flex flex-col gap-xxs border-b border-[#f6f7f9] pb-sm">
                                <div className="flex items-center gap-xs">
                                    <span className="bg-[#4d33cc]/5 text-[#4d33cc] font-mono text-xs px-xs py-1 rounded border border-[#4d33cc]/10">
                                        {classe}
                                    </span>
                                    <span className="text-xxs text-[#151720]/40 font-mono">{px} — {label}</span>
                                </div>
                                <div className={`${classe} font-semibold text-[#151720]`}>
                                    ByteBank, o seu banco digital completo.
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

const meta: Meta<typeof TypographyDashboard> = {
    title: "Design System/Tipografia",
    component: TypographyDashboard,
    parameters: {
        layout: "fullscreen",
        controls: { disable: true },
    },
};

export default meta;
type Story = StoryObj<typeof TypographyDashboard>;

export const VisaoGeral: Story = {};