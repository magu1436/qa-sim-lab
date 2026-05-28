import { InputLabel, Stack, type SxProps } from "@mui/material";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ja";
import { useCallback, type FC } from "react";
import type { Dayjs } from "dayjs";

import useTaskRequest from "@/feature/task/hook/useTaskRequest";
import DateInput from "./DateInput";

type TaskCreatedAtRangeFilter = {
  sx?: SxProps;
};

const TaskCreatedAtRangeFilter: FC<TaskCreatedAtRangeFilter> = ({ sx }) => {
  const { taskRequest, setTaskRequest } = useTaskRequest();

  const handleStartAccept = useCallback(
    (newValue: Dayjs | null) => {
      const date = newValue ? newValue.toDate() : null;
      if (date == taskRequest.dateStart) return;
      setTaskRequest((prev) => ({ ...prev, dateStart: date }));
    },
    [taskRequest, setTaskRequest],
  );
  const handleEndAccept = useCallback(
    (newValue: Dayjs | null) => {
      const date = newValue ? newValue.toDate() : null;
      if (date == taskRequest.dateEnd) return;
      setTaskRequest((prev) => ({ ...prev, dateEnd: date }));
    },
    [setTaskRequest, taskRequest],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ja"}>
      <Stack direction={"column"} sx={{ alignItems: "center" }} spacing={1}>
        <InputLabel>日付指定</InputLabel>
        <DateInput onAccept={handleStartAccept} sx={sx} />
        <KeyboardDoubleArrowDown />
        <DateInput onAccept={handleEndAccept} sx={sx} />
      </Stack>
    </LocalizationProvider>
  );
};

export default TaskCreatedAtRangeFilter;
