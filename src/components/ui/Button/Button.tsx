"use client";

import React from "react";
import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";

interface CustomButtonProps extends AntdButtonProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  children,
  fullWidth = false,
  className = "",
  ...props
}: CustomButtonProps) {
  return (
    <AntdButton
      type="primary"
      className={`h-10 font-medium tracking-wide transition-all ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </AntdButton>
  );
}
