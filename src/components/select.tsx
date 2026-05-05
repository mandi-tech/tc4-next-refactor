import { iSelectInput } from "@/types/iInput";
import { Select } from "antd";

export default function SelectInput(props: iSelectInput) {
  return (
    <div className={`${props.className} flex flex-col gap-1`}>
      {props.label && <p className="text-md font-semibold">{props.label}</p>}
      <Select
        placeholder={props.placeholder}
        size={props.size || "medium"}
        prefix={props.prefixo}
        suffix={props.sufixo}
        disabled={props.disabled}
        options={props.options}
      />
    </div>
  );
}
