import { iInput } from "@/types/iInput";
import { Input } from "antd";

export default function InputTexto(props: iInput) {
  return (
    <div className={`${props.className} flex flex-col gap-1`}>
      <p className="text-md font-semibold">{props.label}</p>
      <Input
        placeholder={props.placeholder}
        size={props.size || "medium"}
        prefix={props.prefixo}
        suffix={props.sufixo}
      />
    </div>
  );
}
