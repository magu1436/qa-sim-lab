import Dialog from "@/component/Dialog";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import { useCallback, useEffect, type FC } from "react";
import TaskDataInput from "./TaskDataInput";
import ParamsInput from "./ParamsInput";
import type { CreateTaskForm } from "@/feature/task/type/task";
import type { TaskPostRequest } from "@/feature/task/type/api";
import { useCreateTask } from "@/feature/task/hook/useTaskApi";
import useCreateTaskDialogContext from "@/feature/home/hook/useCreateTaskDialogContext";
import type { HelperTextKeys } from "./CreateTaskContext";
import DiagFileInput from "./DiagFileInput";

const CreateTaskDialog: FC = () => {
  const { task, setTask, open, setOpen, setHelperText, isLoading } = useCreateTaskDialogContext();
  const registerMutation = useCreateTask();

  useEffect(() => {
    setOpen(task !== undefined);
  }, [task]);

  const handleCancel = useCallback(() => {
    setTask(undefined);
  }, [setTask]);
  const handleSubmit = useCallback(() => {
    if (!task) return;
    const { request, errors } = task2request(task);
    if (errors) {
      errors.forEach(({ key, helperText }) => setHelperText(key, helperText));
      return;
    }
    if (request === null) throw new Error("request is null");
    registerMutation.mutate(request);
  }, [task, registerMutation]);

  return (
    <Dialog
      title="タスク作成"
      open={open}
      onClose={() => setOpen(false)}
      actions={{
        submitButtonlabel: "作成",
        cancelButtonLabel: "キャンセル",
        onSubmit: handleSubmit,
        onCancel: handleCancel,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
            <TaskDataInput />
            <ParamsInput />
          </Stack>
        </Grid>

        <Grid size={6}>
          <DiagFileInput />
        </Grid>
      </Grid>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

const task2request = (
  task: CreateTaskForm,
): {
  request: TaskPostRequest | null;
  errors: { key: HelperTextKeys; helperText: string }[] | null;
} => {
  let errors: { key: HelperTextKeys; helperText: string }[] = [];
  if (task.problemName == null || task.problemName === "")
    errors = [...errors, { key: "problemName", helperText: "最適化問題名の入力は必須です。" }];
  if (task.dt == null)
    errors = [...errors, { key: "dt", helperText: "時間変化量の入力は必須です。" }];
  if (task.tau == null)
    errors = [...errors, { key: "tau", helperText: "終端時間の入力は必須です。" }];
  if (task.b0 == null)
    errors = [...errors, { key: "b0", helperText: "初期磁場の入力は必須です。" }];
  if (task.threads == null)
    errors = [...errors, { key: "threads", helperText: "GPUスレッド数の入力は必須です" }];
  // if (!task.config.inputFile?.file) throw new Error("file is not set");
  if (errors.length > 0) return { request: null, errors };
  const formttedTask: TaskPostRequest = {
    task_name: task.taskName || null,
    problem_name: task.problemName!,
    memo: task.memo || null,
    tau: task.tau!,
    dt: task.dt!,
    b0: task.b0!,
    threads: task.threads!,
    develop_time_method: task.developTimeMethod,
    // input_file: task.inputFile
    input_file: new File([], "input.csv", { type: "text/csv" }),
  };
  return { request: formttedTask, errors: null };
};

export default CreateTaskDialog;
