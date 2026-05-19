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
      className={`gap-sm border-border pt-lg mt-md flex items-center border-t ${
        collapsed && !isMobile ? "justify-center" : "px-sm justify-start"
      }`}
    >
      {(!collapsed || isMobile) && (
        <span className="text-foreground-secondary text-sm whitespace-nowrap">Tema</span>
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
        <div className="bg-background-secondary p-md pt-xl pb-xl flex h-full flex-col justify-between">
          <div>
            <div className="px-sm mb-xl">
              <h1 className="text-primary text-2xl font-bold tracking-tight">ByteBank</h1>
            </div>
            <Menu
              selectedKeys={[pathname]}
              mode="inline"
              items={navigationItems}
              className="border-none bg-transparent"
            />
            <Menu mode="inline" items={logoutItem} className="mt-md border-none bg-transparent" />
          </div>
          <FooterSettings />
        </div>
      </Drawer>
    );
  }

  return (
    <div
      className={`bg-background-secondary p-xs border-border flex h-screen flex-col justify-between border-r shadow-xl transition-all duration-300 ${
        collapsed ? "w-[80px] items-center" : "w-[250px] items-stretch"
      }`}
    >
      <div className="flex w-full flex-col">
        {/* Cabeçalho do Menu */}
        <div
          className={`py-lg px-sm flex w-full items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <h1 className="text-primary overflow-hidden text-2xl font-bold tracking-tight whitespace-nowrap transition-all duration-300">
              ByteBank
            </h1>
          )}
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            className="text-primary hover:!bg-primary/10 flex h-9 w-9 items-center justify-center rounded-md"
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
      <div className="pb-lg w-full">
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
