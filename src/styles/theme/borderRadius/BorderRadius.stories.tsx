import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { borderRadius } from "./borderRadius";

const BorderRadiusDashboard = () => {
    return (
        <div className="p-xl bg-[#f6f7f9] text-[#151720] min-h-screen w-full font-sans">
            {/* Cabeçalho */}
            <div className="mb-xl">
                <h1 className="text-[#4d33cc] text-3xl font-bold tracking-tight mb-xs">
                    ByteBank Border Radius Tokens
                </h1>
                <p className="text-[#151720]/70 text-base">
                    Mapeamento oficial das curvas e arredondamentos estruturais utilizados no projeto.
                </p>
            </div>

            {/* Grid de Amostras */}
            <div className="grid grid-cols-1 gap-lg sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Object.entries(borderRadius).map(([name, value]) => (
                    <div
                        key={name}
                        className="bg-white border border-[#dcdfe5] rounded-xl p-md flex flex-col gap-md shadow-sm transition-all hover:shadow-md"
                    >
                        {/* Box Demonstrativo */}
                        <div className="bg-[#4d33cc]/10 border-2 border-dashed border-[#4d33cc] h-32 w-full flex items-center justify-center p-md">
                            <div
                                className="bg-[#4d33cc] text-white font-medium text-xs shadow-md px-md py-sm flex items-center justify-center text-center transition-all"
                                style={{ borderRadius: value }}
                            >
                                Exemplo ({value})
                            </div>
                        </div>

                        {/* Metadados do Token */}
                        <div className="flex flex-col gap-xs">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-base tracking-tight text-[#151720]">
                                    {name}
                                </span>
                                <span className="bg-[#f6f7f9] text-[#4d33cc] font-mono text-xs px-sm py-xs rounded-md border border-[#dcdfe5]">
                                    rounded-{name === "none" ? "none" : name}
                                </span>
                            </div>
                            <span className="font-mono text-sm text-[#151720]/60">
                                Valor real: {value}
                            </span>

                            {/* Sugestão de Caso de Uso baseada no seu comentário */}
                            <p className="text-xs text-[#151720]/50 mt-xs italic border-t border-[#f6f7f9] pt-xs">
                                {name === "none" && "• Elementos retos ou layouts em bloco total."}
                                {name === "sm" && "• Ideal para tags, badges e checkboxes."}
                                {name === "md" && "• Utilizado em inputs e botões menores."}
                                {name === "lg" && "• O padrão dos seus cards de formulário."}
                                {name === "xl" && "• Blocos em destaque, modais e containers."}
                                {name === "full" && "• Botões estilo pílula ou fotos de avatares."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const meta: Meta<typeof BorderRadiusDashboard> = {
    title: "Design System/Tokens de Bordas",
    component: BorderRadiusDashboard,
    parameters: {
        layout: "fullscreen",
        controls: { disable: true },
    },
};

export default meta;
type Story = StoryObj<typeof BorderRadiusDashboard>;

export const VisaoGeral: Story = {};