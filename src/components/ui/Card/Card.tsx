"use client";

import React from "react";
import { Skeleton } from "antd";
import { CardProps } from "@/libs/types/cards";

interface CardComponentProps extends Omit<CardProps, "border"> {
    border?: boolean | string;
}

export default function Card({
    icon,
    description,
    value,
    loading = false,
    footer,
    color = "foreground",
    backgroundColor = "background-secondary",
    border = false,
}: CardComponentProps) {
    const getBorderStyles = () => {
        if (!border) return { borderColor: "transparent" };
        if (typeof border === "string") return { borderColor: `var(--color-${border})` };
        return { borderColor: "var(--color-border)" };
    };

    const dynamicStyle = {
        color: `var(--color-${color})`,
        backgroundColor: `var(--color-${backgroundColor})`,
        ...getBorderStyles(),
    };

    return (
        <div
        style={dynamicStyle}
        className="flex flex-col gap-md rounded-xl p-lg shadow-md border transition-all duration-200"
        >
        {icon && (
            <span className="w-fit px-xs py-xxs text-2xl bg-current/10 backdrop-blur-sm rounded-md flex items-center justify-center">
            {icon}
            </span>
        )}

        {/* Conteúdo Central */}
        <div className="flex flex-col gap-xxs">
            <p className="opacity-75 text-sm font-medium">{description}</p>

            {loading ? (
            <Skeleton.Button active size="large" className="w-full mt-xs" block />
            ) : (
            <h1 className="text-3xl font-bold tracking-tight">
                {value}
            </h1>
            )}
        </div>

        {/* Footer Opcional */}
        {footer && (
            <div className="text-xs opacity-80 mt-auto border-t border-border/40 pt-xs">
            {footer}
            </div>
        )}
        </div>
    );
}