"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";
import { useAuth } from "@/hooks/use-auth";
import { Button, Drawer, Menu, Switch, type MenuProps } from "antd";
import {
  BarChartOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const navigationItems: MenuItem[] = [
    {
        key: "/",
        icon: <BarChartOutlined />,
        label: <Link href="/">Dashboard</Link>,
    },
    {
        key: "/extrato",
        icon: <FileTextOutlined />,
        label: <Link href="/extrato">Extratro</Link>,
    },
];

export default function SidebarMenu() {
    const [mounted, setMounted] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const { isOpen, setIsOpen, isMobile } = useSidebar();
    const { logout } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(savedTheme === "dark" || (!savedTheme && prefersDark));
    }, []);

    const handleThemeChange = (checked: boolean) => {
        setIsDark(checked);
        const newTheme = checked ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        window.dispatchEvent(new Event("storage"));
        const root = document.documentElement;

        if (checked) {
            root.classList.add("dark");
            root.setAttribute("data-theme", "dark");
        } else {
            root.classList.remove("dark");
            root.setAttribute("data-theme", "light");
        }
    };

    if (!mounted) return null;

    const logoutItem: MenuItem[] = [
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Log Out",
            onClick: logout,
        },
    ];

    const FooterSettings = () => (
        <div
            className={`flex items-center gap-sm border-t border-border pt-lg mt-md ${
                collapsed && !isMobile ? "justify-center" : "justify-start px-sm"
            }`}
        >
            {(!collapsed || isMobile) && (
                <span className="text-sm text-foreground-secondary whitespace-nowrap">
                    Tema
                </span>
            )}
            <Switch
                checked={isDark}
                onChange={handleThemeChange}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
            />
        </div>
    );

    if (isMobile) {
        return (
            <Drawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                placement="left"
                closable={true}
                width={250}
                styles={{
                    body: { padding: 0 },
                    header: { borderBottom: "none" },
                }}
                className="bg-background-secondary text-foreground"
            >
                <div className="h-full bg-background-secondary p-md pt-xl flex flex-col justify-between pb-xl">
                    <div>
                        <div className="px-sm mb-xl">
                            <h1 className="text-2xl font-bold text-primary tracking-tight">
                                ByteBank
                            </h1>
                        </div>
                        <Menu
                            selectedKeys={[pathname]}
                            mode="inline"
                            items={navigationItems}
                            className="border-none bg-transparent"
                        />
                        <Menu
                            mode="inline"
                            items={logoutItem}
                            className="border-none bg-transparent mt-md"
                        />
                    </div>
                    <FooterSettings />
                </div>
            </Drawer>
        );
    }

    return (
        <div
            className={`flex flex-col justify-between h-screen bg-background-secondary p-xs shadow-xl transition-all duration-300 border-r border-border ${
                collapsed ? "w-[80px] items-center" : "w-[250px] items-stretch"
            }`}
        >
            <div className="w-full flex flex-col">
                {/* Cabeçalho do Menu */}
                <div
                    className={`py-lg flex items-center w-full px-sm ${
                        collapsed ? "justify-center" : "justify-between"
                    }`}
                >
                    {!collapsed && (
                        <h1 className="text-2xl font-bold text-primary tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300">
                            ByteBank
                        </h1>
                    )}
                    <Button
                        type="text"
                        onClick={() => setCollapsed(!collapsed)}
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        className="text-primary hover:!bg-primary/10 flex items-center justify-center h-9 w-9 rounded-md"
                    />
                </div>

                {/* Links de Navegação Primários */}
                <Menu
                    selectedKeys={[pathname]}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={navigationItems}
                    className="border-none bg-transparent"
                />
            </div>

            {/* Rodapé Dinâmico (Logout + Theme Switcher) */}
            <div className="w-full pb-lg">
                <Menu
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={logoutItem}
                    className="border-none bg-transparent"
                />
                <FooterSettings />
            </div>
        </div>
    );
}