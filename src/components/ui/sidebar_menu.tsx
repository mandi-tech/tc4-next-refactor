"use client";

import {
  BarChartOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Menu, MenuProps, Switch } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSidebar } from "@/context/sidebar-context";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/",
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
  const { isOpen, setIsOpen, isMobile } = useSidebar();
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

  if (!mounted) return null;

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
          header: { borderBottom: "1px solid var(--border)" },
        }}
        title={
          <span className="text-azul font-bold tracking-tight">Bytebank</span>
        }
        className="dark:bg-secondaryBackground"
      >
        <div className="h-full bg-secondaryBackground px-2 pt-4 flex flex-col justify-between pb-10">
          <div>
            <Menu
              selectedKeys={[pathname]}
              mode="inline"
              items={items}
              className="border-none bg-transparent"
              onClick={() => setDrawerOpen(false)}
            />
          </div>
          <div className="px-4 flex items-center gap-3">
            <span className="text-sm text-foreground opacity-70">Tema</span>
            <Switch
              checked={isDark}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
          </div>
        </div>
      </Drawer>
    );
  }

  return (
    <div
      className={`flex flex-col items-center h-screen bg-secondaryBackground px-2 shadow-xl transition-colors duration-300 ${collapsed ? "w-[80px]" : "w-[250px]"}`}
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
