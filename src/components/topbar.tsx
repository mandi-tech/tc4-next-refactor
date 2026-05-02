import { Avatar } from "antd";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center py-5">
      <h1 className="text-3xl font-semibold">Titulo da pagina</h1>

      <div className="flex items-center gap-2">
        <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
          U
        </Avatar>
        <h5 className="text-md">Nome do usuário</h5>
      </div>
    </div>
  );
}
