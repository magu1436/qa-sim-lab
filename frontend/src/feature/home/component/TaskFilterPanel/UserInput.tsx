import useTaskRequest from "@/feature/task/hook/useTaskRequest";
import { TextField, type SxProps } from "@mui/material";
import { useCallback } from "react";

type UserInputProps = {
  sx?: SxProps;
};

const UserInput = ({ sx }: UserInputProps) => {
  const { taskRequest, setTaskRequest } = useTaskRequest();
  const handleOnBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (taskRequest.user === value) return;
    setTaskRequest((prev) => ({ ...prev, studentId: value }));
  }, [taskRequest, setTaskRequest]);
  return (
    <>
      <TextField sx={sx} label={"学生証番号 / 名前"} onBlur={handleOnBlur} />
    </>
  );
};

export default UserInput;
