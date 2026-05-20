// src/styles/theme/Shadows.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { shadows } from "./shadows";

const ShadowsDashboard = () => {
    return (
        <div className="p-xl bg-[#f6f7f9] text-[#151720] min-h-screen w-full font-sans">
            {/* Cabeçalho */}
            <div className="mb-xl">
                <h1 className="text-[#4d33cc] text-3xl font-bold tracking-tight mb-xs">
                    ByteBank Box Shadow Tokens
                </h1>
                <p className="text-[#151720]/70 text-base">
                    Mapeamento oficial de elevação, profundidade e relevo visual para os componentes.
                </p>
            </div>

            {/* Grid de Amostras */}
            <div className="grid grid-cols-1 gap-xl sm:grid-cols-2 md:grid-cols-4">
                {Object.entries(shadows).map(([name, value]) => (
                    <div
                        key={name}
                        className="bg-white border border-[#dcdfe5]/60 rounded-xl p-xl flex flex-col items-center justify-between gap-lg text-center"
                        style={{ boxShadow: value }}
                    >
                        {/* Texto indicativo de profundidade */}
                        <div className="flex flex-col gap-xs w-full">
                            <span className="font-bold text-lg tracking-tight text-[#151720] uppercase">
                                {name}
                            </span>
                            <span className="bg-[#4d33cc]/5 text-[#4d33cc] font-mono text-xs px-sm py-xs rounded-md border border-[#4d33cc]/20 self-center">
                                shadow-{name === "none" ? "none" : name}
                            </span>
                        </div>

                        {/* Simulação de Elevação */}
                        <div className="text-xs text-[#151720]/50 italic border-t border-[#f6f7f9] pt-sm w-full">
                            {name === "none" && "• Elementos planos na superfície da página."}
                            {name === "sm" && "• Pequeno relevo para botões e inputs discretos."}
                            {name === "md" && "• O padrão dos seus cards financeiros (rounded-xl)."}
                            {name === "lg" && "• Elevação forte para menus flutuantes, modais e tooltips."}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const meta: Meta<typeof ShadowsDashboard> = {
    title: "Design System/Tokens de Sombras",
    component: ShadowsDashboard,
    parameters: {
        layout: "fullscreen",
        controls: { disable: true },
    },
};

export default meta;
type Story = StoryObj<typeof ShadowsDashboard>;

export const VisaoGeral: Story = {};