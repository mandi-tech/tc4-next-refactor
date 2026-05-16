"use client";

import {
  BarChartOutlined,
  FileTextOutlined,
  LogoutOutlined,
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
import { useAuth } from "@/hooks/use-auth";

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
  const { logout } = useAuth();
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
          header: {
            borderBottom: "none",
            backgroundColor: "var(--secondary-background)",
          },
        }}
        className="dark:bg-secondaryBackground"
      >
        <div className="h-full bg-secondaryBackground px-2 pt-6 flex flex-col justify-between pb-10">
          <div>
            <div className="px-4 mb-8">
              <h1 className="text-2xl font-bold text-azul tracking-tight">
                Bytebank
              </h1>
            </div>
            <Menu
              selectedKeys={[pathname]}
              mode="inline"
              items={items}
              className="border-none bg-transparent"
            />
            <Menu
              mode="inline"
              items={[
                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: "Log Out",
                  onClick: logout,
                },
              ]}
              className="border-none bg-transparent mt-4"
            />
          </div>
          <div className="px-4 flex items-center gap-3 border-t border-border pt-6">
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
      className={`flex flex-col items-center justify-between h-screen bg-secondaryBackground p-2 shadow-xl transition-colors duration-300 ${collapsed ? "w-[80px]" : "w-[250px]"}`}
    >
      {" "}
      <div className="w-full flex flex-col items-center">
        <div
          className={`py-8 flex items-center gap-3 w-full px-4 ${collapsed ? "justify-center" : "justify-between"}`}
        >
          {!collapsed && (
            <h1 className="text-2xl font-bold text-azul tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300">
              Bytebank
            </h1>
          )}
          <Button
            type="text"
            onClick={toggleCollapsed}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            className="text-azul hover:!bg-azul/10 flex items-center justify-center"
          />
        </div>
        <Menu
          selectedKeys={[pathname]}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          className="border-none bg-transparent px-2"
        />
      </div>
      <div className="w-full px-2 pb-6">
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          items={[
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Log Out",
              onClick: logout,
            },
          ]}
          className="border-none bg-transparent"
        />
        <div
          className={`flex items-center gap-3 px-4 mt-4 border-t border-border pt-6 ${collapsed ? "justify-center" : "justify-start"}`}
        >
          {!collapsed && (
            <span className="text-sm text-foreground opacity-70 whitespace-nowrap">
              Tema
            </span>
          )}
          <Switch
            checked={isDark}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </div>
      </div>
    </div>
  );
}
