"use client";

import React from "react";
import { Skeleton } from "antd";
import { CardProps } from "./types";

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
      className="border! border-border! bg-background-secondary! gap-md p-lg flex flex-col rounded-xl border shadow-md transition-all duration-200"
    >
      {icon && (
        <span className="px-xs py-xxs flex w-fit items-center justify-center rounded-md bg-current/10 text-2xl backdrop-blur-sm">
          {icon}
        </span>
      )}

      {/* Conteúdo Central */}
      <div className="gap-xxs flex flex-col">
        <p className="text-sm font-medium opacity-75">{description}</p>

        {loading ? (
          <Skeleton.Button active size="large" className="mt-xs w-full" block />
        ) : (
          <h1 className="text-3xl font-bold tracking-tight">{value}</h1>
        )}
      </div>

      {/* Footer Opcional */}
      {footer && (
        <div className="border-border/40 pt-xs mt-auto border-t text-xs opacity-80">{footer}</div>
      )}
    </div>
  );
}
