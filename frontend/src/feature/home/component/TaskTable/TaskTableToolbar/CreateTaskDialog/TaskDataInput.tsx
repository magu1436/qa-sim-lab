import useCreateTaskDialogContext from "@/feature/home/hook/useCreateTaskDialogContext";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import { useCallback, type FC } from "react";

const TaskDataInput: FC = () => {
  const { task, setTask, helperTexts, setHelperText } = useCreateTaskDialogContext();

  const handleTaskNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!task) return;
      setTask(prev => prev && {
        ...prev,
        taskName: e.target.value,
      });
    },
    [task, setTask],
  );

  const handleProblemNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTask(prev => prev && {
        ...prev,
        problemName: e.target.value,
      });
      setHelperText("problemName", null);
    },
    [setTask, setHelperText],
  );
  const handleProblemNameBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const problemName = e.target.value.trim();
      if (problemName === "") {
        setHelperText("problemName", "最適化問題名の入力は必須です");
        return;
      }
      setTask(prev => prev && {
        ...prev,
        problemName,
      });
    },
    [setTask, setHelperText],
  );

  const handleMemoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTask(prev => prev && {
        ...prev,
        memo: e.target.value,
      });
    },
    [setTask],
  );

  return (
    <>
      <Stack direction={"column"} spacing={1}>
        <Typography variant={"h6"}>タスクデータ</Typography>
        <Divider orientation="horizontal" flexItem />
        <TextField
          label={"最適化問題名"}
          value={task?.problemName || ""}
          onChange={handleProblemNameChange}
          onBlur={handleProblemNameBlur}
          helperText={helperTexts.problemName}
          error={helperTexts.problemName !== null}
        />
        <TextField label={"タスク名"} value={task?.taskName || ""} onChange={handleTaskNameChange} />
        <TextField label={"メモ"} value={task?.memo || ""} onChange={handleMemoChange} multiline rows={4} />
      </Stack>
    </>
  );
};

export default TaskDataInput;
