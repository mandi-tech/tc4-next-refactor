"use client";

import {
  BarChartOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps, Switch } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/", // A key deve ser igual à rota para facilitar o "active"
    icon: <BarChartOutlined />,
    label: <Link href="/">Dashboard</Link>,
  },
  {
    key: "/extrato",
    icon: <FileTextOutlined />,
    label: <Link href="/extrato">Extrato</Link>,
  },
];

export default function SidebarMenu() {
  const [mounted, setMounted] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(savedTheme === "dark" || (!savedTheme && prefersDark));
  }, []);

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked);
    const newTheme = checked ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("storage"));
    if (checked) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      className={`h-screen bg-secondaryBackground px-2 shadow-xl transition-colors duration-300 ${collapsed ? "w-[80px]" : "w-[250px]"}`}
    >
      {" "}
      <div className="py-4 flex">
        <Button type="primary" onClick={toggleCollapsed} className="mb-4">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu
        selectedKeys={[pathname]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        className="border-none bg-transparent"
      />
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
      />
    </div>
  );
}
