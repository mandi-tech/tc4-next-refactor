import { iCardProps } from "@/libs/types/iCards";
import { Skeleton } from "antd";

function getContrastColor(hexColor: string) {
  if (!hexColor) return "var(--preto)";

  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "var(--preto)" : "var(--cinza )";
}

export default function Card(props: iCardProps) {
  return (
    <div
      className={`
        flex flex-col gap-4 rounded-2xl p-6 text-white shadow-lg text-${props.color}
    `}
      style={{
        border: props.border ? `1px solid var(--${props.border})` : "none",
        color: props.color ? `var(--${props.color})` : "var(--cinza )",
        backgroundColor: props.backgroundColor
          ? `var(--${props.backgroundColor})`
          : "var(--cinza)",
      }}
    >
      <span
        className={`w-[fit-content] px-2 py-1 text-2xl bg-branco/30 rounded-sm`}
      >
        {props.icone}
      </span>

      <div>
        <p className={`opacity-80 text-sm`}>{props.descricao}</p>
        {props.loading ? (
          <Skeleton.Button active size="large" className="w-full mt-2" block />
        ) : (
          <h1 className={`text-${props.color} text-3xl font-semibold`}>
            {props.valor}
          </h1>
        )}
      </div>

      <div>{props.footer}</div>
    </div>
  );
}
