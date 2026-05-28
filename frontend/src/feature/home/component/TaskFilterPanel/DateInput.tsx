import type { SxProps } from "@mui/material";
import { useState, type FC } from "react";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

type DateInputProps = {
  onAccept: (value: Dayjs | null) => void;
  sx?: SxProps;
};

const DateInput: FC<DateInputProps> = ({ onAccept, sx }) => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <DatePicker
        sx={sx}
        value={date}
        onChange={setDate}
        onAccept={onAccept}
        format="YYYY/MM/DD"
        slotProps={{
          actionBar: {
            actions: ["clear", "accept"],
          },
        }}
      />
    </>
  );
};

export default DateInput;
