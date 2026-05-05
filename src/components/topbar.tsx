"use client";

import { Avatar } from "antd";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/") return "Dashboard";

    const routeName = pathname.split("/")[1];
    return routeName.charAt(0).toUpperCase() + routeName.slice(1);
  };
  return (
    <div className="flex justify-between items-center py-5">
      <h1 className="text-3xl font-semibold">{getTitle()}</h1>
      <div className="flex items-center gap-2">
        <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
          U
        </Avatar>
        <h5 className="text-md">Nome do usuário</h5>
      </div>
    </div>
  );
}
