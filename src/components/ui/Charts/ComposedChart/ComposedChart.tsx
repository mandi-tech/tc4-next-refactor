"use client";

import React from "react";
import { Skeleton } from "antd";
import {
    ResponsiveContainer,
    ComposedChart as RechartsComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

export interface ChartConfig {
    key: string;
    label: string;
    color: string;
    type: "line" | "bar";
}

export interface CustomChartProps<T = Record<string, any>> {
    data: T[];
    configs: ChartConfig[];
    xAxisKey: string;
    title?: string;
    className?: string;
    loading?: boolean;
}

export default function ComposedChart<T extends Record<string, any>>({
    data,
    configs,
    xAxisKey,
    title,
    className = "",
    loading = false,
}: CustomChartProps<T>) {
    return (
        <div
            className={`w-full bg-background-secondary border border-border shadow-sm p-lg rounded-xl flex flex-col justify-between ${className}`}
        >
            {title && (
                <h2 className="text-xl font-semibold text-foreground tracking-tight mb-md">
                    {title}
                </h2>
            )}

            {loading ? (
                <div className="flex flex-col justify-center h-[300px] gap-md w-full">
                    <Skeleton.Button active size="small" shape="square" className="w-1/4 mb-sm" />
                    <Skeleton active paragraph={{ rows: 4 }} title={false} />
                </div>
            ) : (
                <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="var(--color-border)"
                            />
                            <XAxis 
                                dataKey={xAxisKey} 
                                tick={{ fontSize: 12, fill: "var(--color-foreground-secondary)" }}
                                axisLine={{ stroke: "var(--color-border)" }}
                                tickLine={false}
                            />
                            <YAxis 
                                tick={{ fontSize: 12, fill: "var(--color-foreground-secondary)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--color-background-secondary)",
                                    borderRadius: "var(--radius-md)",
                                    border: "1px solid var(--color-border)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                }}
                                itemStyle={{ fontSize: 13 }}
                                labelStyle={{ color: "var(--color-foreground)", fontWeight: 600, marginBottom: 4 }}
                            />
                            <Legend
                                verticalAlign="top"
                                align="right"
                                height={36}
                                iconType="circle"
                                iconSize={8}
                                formatter={(value) => (
                                    <span className="text-xs font-medium text-foreground-secondary ml-xs">
                                        {value}
                                    </span>
                                )}
                            />

                            {configs.map((config) => {
                                if (config.type === "bar") {
                                    return (
                                        <Bar
                                            key={config.key}
                                            dataKey={config.key}
                                            name={config.label}
                                            fill={config.color}
                                            radius={[4, 4, 0, 0]}
                                            barSize={32}
                                        />
                                    );
                                }
                                return (
                                    <Line
                                        key={config.key}
                                        type="monotone"
                                        dataKey={config.key}
                                        name={config.label}
                                        stroke={config.color}
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: config.color, strokeWidth: 0 }}
                                        activeDot={{ r: 6, strokeWidth: 2 }}
                                    />
                                );
                            })}
                        </RechartsComposedChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}