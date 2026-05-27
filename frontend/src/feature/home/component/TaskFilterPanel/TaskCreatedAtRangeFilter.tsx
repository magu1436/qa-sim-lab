import useTaskRequest from "@/feature/task/hook/useTaskRequest";
import { InputLabel, Stack, TextField, type SxProps } from "@mui/material";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { useCallback, useState, type FC } from "react";

type TaskCreatedAtRangeFilter = {
  sx?: SxProps;
};

const TaskCreatedAtRangeFilter: FC<TaskCreatedAtRangeFilter> = ({ sx }) => {
  const [starthelperText, setStartHelperText] = useState<string | null>(null);
  const [endhelperText, setEndHelperText] = useState<string | null>(null);
  const { taskRequest, setTaskRequest } = useTaskRequest();

  const handleStartBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      let value: Date | null = e.target.value.trim() ? new Date(e.target.value.trim()) : null;
      if (value && isNaN(value.getDate())) {
        setStartHelperText("入力された日付が不正です");
        return;
      }
      if (value == taskRequest.dateStart) return;
      setTaskRequest((prev) => ({ ...prev, dateStart: value }));
    },
    [setTaskRequest, setStartHelperText],
  );
  const handleEndBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      let value: Date | null = e.target.value.trim() ? new Date(e.target.value.trim()) : null;
      if (value && isNaN(value.getDate())) {
        setEndHelperText("入力された日付が不正です");
        return;
      }
      if (value == taskRequest.dateEnd) return;
      setTaskRequest((prev) => ({ ...prev, dateEnd: value }));
    },
    [setTaskRequest, setEndHelperText, taskRequest],
  );

  return (
    <>
      <Stack direction={"column"} sx={{ alignItems: "center" }}>
        <InputLabel>日付指定</InputLabel>
        <TextField
          sx={sx}
          type={"date"}
          onBlur={handleStartBlur}
          helperText={starthelperText}
          error={starthelperText !== null}
        />
        <KeyboardDoubleArrowDown />
        <TextField
          sx={sx}
          type={"date"}
          onBlur={handleEndBlur}
          helperText={endhelperText}
          error={endhelperText !== null}
        />
      </Stack>
    </>
  );
};

export default TaskCreatedAtRangeFilter;
