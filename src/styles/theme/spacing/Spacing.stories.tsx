// src/styles/theme/spacing/Spacing.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { spacing } from "./spacing"; // Ajuste o caminho conforme sua nova estrutura de pastas

const SpacingDashboard = () => {
    return (
        <div className="p-xl bg-[#f6f7f9] text-[#151720] min-h-screen w-full font-sans">
            {/* Cabeçalho */}
            <div className="mb-xl">
                <h1 className="text-[#4d33cc] text-3xl font-bold tracking-tight mb-xs">
                    ByteBank Spacing Tokens
                </h1>
                <p className="text-[#151720]/70 text-base">
                    Mapeamento oficial de escala de distâncias para paddings, margins e gaps de grid.
                </p>
            </div>

            {/* Tabela / Guia Visual */}
            <div className="bg-white border border-[#dcdfe5] rounded-xl shadow-sm overflow-hidden w-full max-w-4xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#f6f7f9] border-b border-[#dcdfe5] text-xs font-bold uppercase tracking-wider text-[#151720]/70">
                                <th className="p-md w-24">Token</th>
                                <th className="p-md w-32">Equivalente Tailwind</th>
                                <th className="p-md w-24">Valor Real</th>
                                <th className="p-md text-center w-full">Representação Visual</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f6f7f9]">
                            {Object.entries(spacing).map(([name, value]) => (
                                <tr key={name} className="hover:bg-[#f6f7f9]/30 transition-colors">
                                    {/* Nome do Token */}
                                    <td className="p-md font-bold text-base text-[#151720]">
                                        {name}
                                    </td>

                                    {/* Atalho de Classes utilitárias do Tailwind */}
                                    <td className="p-md">
                                        <span className="bg-[#4d33cc]/5 text-[#4d33cc] font-mono text-xs px-sm py-xs rounded-md border border-[#4d33cc]/10 block w-fit">
                                            p-{name} / m-{name} / gap-{name}
                                        </span>
                                    </td>

                                    {/* Valor em px */}
                                    <td className="p-md font-mono text-sm text-[#151720]/70">
                                        {value}
                                    </td>

                                    {/* Régua/Barra Indicadora de Tamanho */}
                                    <td className="p-md align-middle">
                                        <div className="flex items-center gap-sm w-full">
                                            <div
                                                className="bg-[#4d33cc] h-5 rounded-sm transition-all shadow-sm"
                                                style={{ width: value }}
                                                title={`Tamanho: ${value}`}
                                            />
                                            {/* Linha guia para os tamanhos menores ficarem visíveis */}
                                            <span className="text-xxs text-[#151720]/30 font-mono">
                                                |
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const meta: Meta<typeof SpacingDashboard> = {
    title: "Design System/Tokens de Espaçamento",
    component: SpacingDashboard,
    parameters: {
        layout: "fullscreen",
        controls: { disable: true },
    },
};

export default meta;
type Story = StoryObj<typeof SpacingDashboard>;

export const VisaoGeral: Story = {};