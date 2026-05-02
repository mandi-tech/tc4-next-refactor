"use client";

import {
  AppstoreOutlined,
  BarChartOutlined,
  ContainerOutlined,
  DesktopOutlined,
  FileTextOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <BarChartOutlined />,
    label: <a className="text-md leading-none font-semibold">Dashboard</a>,
  },
  {
    key: "2",
    icon: <FileTextOutlined />,
    label: <a className="text-md leading-none font-semibold">Extrato</a>,
  },
];

export default function SidebarMenu() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="h-[100vh] bg-secondary-background px-2 shadow-xl">
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
}
