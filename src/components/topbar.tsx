"use client";

import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Avatar, Button, Switch } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ModalTransacao from "./modals/modal_transacao";

export default function Topbar() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [tipoTransacao, setTipoTransacao] = useState<"entrada" | "saida">(
    "entrada",
  );

  const handlemodalOpen = () => {
    setModalOpen(!modalOpen);
    setTipoTransacao("entrada");
  };

  const handleSaidaOpen = () => {
    setModalOpen(!modalOpen);
    setTipoTransacao("saida");
  };

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

  if (!mounted) {
    return (
      <div className="flex justify-between items-center py-5">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Switch disabled loading />
      </div>
    );
  }

  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/") return "Dashboard";
    const routeName = pathname.split("/")[1];
    return routeName.charAt(0).toUpperCase() + routeName.slice(1);
  };

  return (
    <div className="flex justify-between items-center py-5">
      <h1 className="text-3xl font-semibold text-foreground">{getTitle()}</h1>

      <div className="flex items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <Button
            className="w-full !bg-branco !text-azul"
            onClick={handlemodalOpen}
          >
            Nova Receita
          </Button>
          <Button
            variant="outlined"
            className="w-full !bg-azul !text-branco"
            onClick={handleSaidaOpen}
          >
            Nova Saída
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isDark}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </div>

        <div className="flex items-center gap-2 border-l pl-4 border-border">
          <Avatar
            style={{
              backgroundColor: "var(--lavanda)",
              color: "var(--branco)",
            }}
          >
            U
          </Avatar>
          <h5 className="text-md text-foreground">Nome do usuário</h5>
        </div>
      </div>
      <ModalTransacao
        isModalOpen={modalOpen}
        handleOk={() => {}}
        handleCancel={handlemodalOpen}
        tipo={"novo"}
        tipoTransacao={tipoTransacao}
      />
    </div>
  );
}
