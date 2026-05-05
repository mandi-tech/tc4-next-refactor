import { iDateInput } from "@/types/iInput";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function DateInput(props: iDateInput) {
  return (
    <div className={`${props.className} flex flex-col gap-1`}>
      <p className="text-md font-semibold">{props.label}</p>
      <DatePicker
        placeholder={props.placeholder}
        size={props.size || "medium"}
        disabled={props.disabled}
        format="DD/MM/YYYY"
        minDate={props.minDate ? dayjs(props.minDate) : undefined}
        maxDate={props.maxDate ? dayjs(props.maxDate) : undefined}
      />
    </div>
  );
}
