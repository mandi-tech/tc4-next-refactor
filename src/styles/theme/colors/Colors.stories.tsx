import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightPalette, darkPalette } from "../colors/colors";

const ColorsDashboard = () => {
    return (
        <div className="w-full font-sans min-h-screen flex flex-col">
            {/* 1. SEÇÃO LIGHT (Fundo Claro) */}
            <div className="p-xl bg-[#fafaf9] text-[#151720] flex-1 border-b border-[#dcdfe5]">
                <div className="mb-xl">
                    <h1 className="text-[#4d33cc] text-3xl font-bold tracking-tight mb-xs">ByteBank Design Tokens</h1>
                    <p className="text-[#151720]/70 text-base">
                        Visualização oficial das paletas Light e Dark mapeadas no projeto.
                    </p>
                </div>

                <h2 className="text-xl font-bold mb-md text-[#e88e3d] border-b border-[#dcdfe5] pb-xs">
                    Modo Claro (Light Palette)
                </h2>
                <div className="grid grid-cols-1 gap-md sm:grid-cols-2 md:grid-cols-4">
                    {Object.entries(lightPalette).map(([name, hex]) => (
                        <div key={name} className="bg-[#ffffff] border border-[#dcdfe5] rounded-xl overflow-hidden shadow-sm">
                            <div className="h-20 w-full" style={{ backgroundColor: hex }} />
                            <div className="p-sm flex flex-col">
                                <span className="font-semibold text-sm text-[#151720]">{name}</span>
                                <span className="font-mono text-xs text-[#151720]/50 uppercase">{hex}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. SEÇÃO DARK (Fundo Escuro) */}
            <div className="p-xl bg-[#151720] text-[#fafaf9] flex-1">
                <h2 className="text-xl font-bold mb-md text-[#e88e3d] border-b border-[#3a3850] pb-xs">
                    Modo Escuro (Dark Palette)
                </h2>
                <div className="grid grid-cols-1 gap-md sm:grid-cols-2 md:grid-cols-4">
                    {Object.entries(darkPalette).map(([name, hex]) => (
                        <div key={name} className="bg-[#1d2030] border border-[#3a3850] rounded-xl overflow-hidden shadow-sm">
                            <div className="h-20 w-full" style={{ backgroundColor: hex }} />
                            <div className="p-sm flex flex-col">
                                <span className="font-semibold text-sm text-[#fafaf9]">{name}</span>
                                <span className="font-mono text-xs text-[#fafaf9]/50 uppercase">{hex}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const meta: Meta<typeof ColorsDashboard> = {
    title: "Design System/Tokens de Cor",
    component: ColorsDashboard,
    parameters: {
        layout: "fullscreen",
        controls: { disable: true },
    },
};

export default meta;
type Story = StoryObj<typeof ColorsDashboard>;
export const PaletaCompleta: Story = {};