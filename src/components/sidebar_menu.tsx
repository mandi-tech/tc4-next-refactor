"use client";

import {
  BarChartOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

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
    </div>
  );
}
