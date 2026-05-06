import { iDateInput } from "@/types/iInput";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function RangeDateInput(props: iDateInput) {
  return (
    <div className={`${props.className} flex flex-col gap-1`}>
      <p className="text-md font-semibold">{props.label}</p>
      <RangePicker
        size={props.size || "medium"}
        disabled={props.disabled}
        format="DD/MM/YYYY"
        minDate={props.minDate ? dayjs(props.minDate) : undefined}
        maxDate={props.maxDate ? dayjs(props.maxDate) : undefined}
        placeholder={["Data início", "Data fim"]}
      />
    </div>
  );
}
