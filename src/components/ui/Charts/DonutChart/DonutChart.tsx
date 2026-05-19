"use client";

import React from "react";
import { Skeleton } from "antd";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

export interface DonutData {
    name: string;
    value: number;
}

export interface DonutChartProps {
    data: DonutData[];
    colors?: string[];
    className?: string;
    title?: string;
    loading?: boolean;
}

const DEFAULT_COLORS = [
    "var(--color-primary)",
    "var(--color-success)",
    "var(--color-warning)",
    "var(--color-danger)",
    "var(--color-purple)",
];

export default function DonutChart({
    data,
    colors = DEFAULT_COLORS,
    className = "",
    title,
    loading = false,
}: DonutChartProps) {
    const formattedData = data.map((item) => ({
        ...item,
        name: item.name
            ? item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()
            : "",
    }));

    return (
        <div
        className={`w-full h-[400px] p-lg bg-background-secondary rounded-xl border border-border shadow-sm flex flex-col justify-between ${className}`}
        >
            {title && (
                <h2 className="text-xl font-semibold text-foreground tracking-tight mb-md">
                    {title}
                </h2>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-md">
                    <Skeleton.Avatar active size={160} shape="circle" />
                    <Skeleton active paragraph={{ rows: 1 }} title={false} className="w-4/5" />
                </div>
            ) : (
                <div className="w-full flex-1 min-h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={formattedData}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {formattedData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                        stroke="var(--color-background-secondary)" // Cria uma separação elegante entre fatias
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--color-background-secondary)",
                                    borderRadius: "var(--radius-md)",
                                    border: "1px solid var(--color-border)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                }}
                                itemStyle={{ color: "var(--color-foreground)" }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                iconType="circle"
                                iconSize={8}
                                formatter={(value) => (
                                    <span className="text-xs font-medium text-foreground-secondary ml-xs">
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}