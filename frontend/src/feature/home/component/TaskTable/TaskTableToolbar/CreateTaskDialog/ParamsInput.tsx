import useCreateTaskDialogContext from "@/feature/home/hook/useCreateTaskDialogContext";
import { ALL_DEVELOP_TIME_METHODS, type DevelopTimeMethod } from "@/feature/task/type/task";
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback } from "react";

const ParamsInput = () => {
  const { task, setTask, helperTexts, setHelperText } = useCreateTaskDialogContext();
  const handleParamChange = useHandleParamChange();

  const handleStepChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTask((prev) => prev && { ...prev, step: Number(e.target.value.trim()) });
      setHelperText("step", null);
    },
    [setTask, setHelperText],
  );
  const handleStepBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!task) return;
      const step = Number(e.target.value.trim());
      const { error, helperText } = checkStepError(step);
      if (error) {
        setHelperText("step", helperText);
        return;
      }
      const dt = task.tau ? undefined : task.dt;  // tauが設定されている場合はdtを変更するためにundefinedに
      handleParamChange(step, task.tau, dt);
    },
    [task, setHelperText, handleParamChange],
  );

  const handleTauChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const tau = Number(e.target.value.trim());
      setTask(
        (prev) =>
          prev && {
            ...prev,
            tau,
          },
      );
      setHelperText("tau", null);
    },
    [setTask, setHelperText],
  );
  const handleTauBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!task) return;
      const tau = Number(e.target.value.trim());
      const { error, helperText } = checkTauError(tau);
      if (error) {
        setHelperText("tau", helperText);
        return;
      }
      const dt = task.step ? undefined : task.dt;  // stepが入力されている場合はdtを変更するためにundefinedに
      handleParamChange(task.step, tau, dt);
    },
    [task, setHelperText, handleParamChange],
  );

  const handleDtChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const dt = Number(e.target.value.trim());
      setTask(
        (prev) =>
          prev && {
            ...prev,
            dt,
          },
      );
      setHelperText("dt", null);
    },
    [setTask, setHelperText],
  );
  const handleDtBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!task) return;
      const dt = Number(e.target.value.trim());
      const res = checkDtError(dt);
      if (res.error) {
        setHelperText("dt", res.helperText);
        return;
      }
      const tau = task.step ? undefined : task.tau;  // stepが入力されている場合はtauを変更するためにundefinedに
      handleParamChange(task.step, tau, dt);
    },
    [task, setHelperText, handleParamChange],
  );

  const handleThreadsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const threads = Number(e.target.value.trim());
      setTask(
        (prev) =>
          prev && {
            ...prev,
            threads,
          },
      );
      setHelperText("threads", null);
    },
    [setTask, setHelperText],
  );
  const handleThreadsBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const threads = Number(e.target.value.trim());
      const { error, helperText } = checkThreadsError(threads);
      if (error) {
        setHelperText("threads", helperText);
        return;
      }
    },
    [setHelperText],
  );

  const handleB0Change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const b0 = Number(e.target.value.trim());
      setTask(
        (prev) =>
          prev && {
            ...prev,
            b0,
          },
      );
      setHelperText( "b0", null);
    },
    [setTask, setHelperText],
  );
  const handleB0Blur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!task) return;
      const b0 = Number(e.target.value.trim());
      const res = checkB0Error(b0);
      if (res.error) {
        setHelperText("b0", res.helperText);
        return;
      }
      setTask(
        (prev) =>
          prev && {
            ...prev,
            b0,
          },
      );
    },
    [task, setTask, setHelperText],
  );

  const handleDevelopmentChange = useCallback(
    (method: DevelopTimeMethod) => {
      setTask(
        (prev) =>
          prev && {
            ...prev,
            development: method,
          },
      );
    },
    [setTask],
  );

  return (
    <Stack direction={"column"} spacing={1}>
      <Typography variant="h6">パラメータ</Typography>
      <Divider orientation="horizontal" />
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label="ステップ数(step)"
            type="number"
            value={task?.step || ""}
            onChange={handleStepChange}
            onBlur={handleStepBlur}
            helperText={helperTexts.step}
            error={helperTexts.step !== null}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="GPUスレッド数"
            type="number"
            value={task?.threads || ""}
            onChange={handleThreadsChange}
            onBlur={handleThreadsBlur}
            helperText={helperTexts.threads}
            error={helperTexts.threads !== null}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="終端時間(tau)"
            type="number"
            value={task?.tau || ""}
            onChange={handleTauChange}
            onBlur={handleTauBlur}
            helperText={helperTexts.tau}
            error={helperTexts.tau !== null}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="初期磁場(B0)"
            type="number"
            value={task?.b0 || ""}
            onChange={handleB0Change}
            onBlur={handleB0Blur}
            helperText={helperTexts.b0}
            error={helperTexts.b0 !== null}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="時間変化量(dt)"
            type="number"
            value={task?.dt || ""}
            onChange={handleDtChange}
            onBlur={handleDtBlur}
            helperText={helperTexts.dt}
            error={helperTexts.dt !== null}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>時間発展関数</InputLabel>
            <Select
              value={task?.developTimeMethod || "AUTO"}
              onChange={(e) => handleDevelopmentChange(e.target.value)}
              input={<OutlinedInput label="時間発展関数" />}
            >
              {ALL_DEVELOP_TIME_METHODS.map((method) => {
                return (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Stack>
  );
};

const useHandleParamChange = () => {
  const { setTask, setHelperText } = useCreateTaskDialogContext();

  const handleParamChange = useCallback(
    (step?: number, tau?: number, dt?: number) => {
      step = step || ((dt && tau) && dt / tau);
      tau = tau || ((step && dt) && dt * step);
      dt = dt || ((step && tau) && tau / step);
      setTask(
        (prev) =>  prev && {
          ...prev,
          step,
          tau,
          dt
        }
      );
      if (step) setHelperText("step", null);
      if (tau) setHelperText("tau", null);
      if (dt) setHelperText("dt", null);
    },
    [setTask, setHelperText],
  )

  return handleParamChange;
}

const checkStepError = (step: number): { error: boolean; helperText: string | null } => {
  if (isNaN(step)) {
    return { error: true, helperText: "整数値を入力してください" };
  }
  if (step <= 0) {
    return { error: true, helperText: "自然数を入力してください" };
  }
  if (Number.isInteger(step) === false) {
    return { error: true, helperText: "整数値を入力してください" };
  }
  return { error: false, helperText: null };
};

const checkTauError = (tau: number): { error: boolean; helperText: string | null } => {
  if (isNaN(tau)) {
    return { error: true, helperText: "実数値を入力してください" };
  }
  if (tau <= 0) {
    return { error: true, helperText: "0より大きい実数を入力してください" };
  }
  return { error: false, helperText: null };
};

const checkDtError = (dt: number): { error: boolean; helperText: string | null } => {
  if (isNaN(dt)) {
    return { error: true, helperText: "実数値を入力してください" };
  }
  if (dt <= 0) {
    return { error: true, helperText: "0より大きい実数を入力してください" };
  }
  return { error: false, helperText: null };
};

const checkThreadsError = (threads: number): { error: boolean; helperText: string | null } => {
  if (isNaN(threads)) {
    return { error: true, helperText: "整数値を入力してください" };
  }
  if (!Number.isInteger(Math.log2(threads))) {
    return { error: true, helperText: "2のべき乗を入力してください" };
  }
  if (threads <= 0) {
    return { error: true, helperText: "自然数を入力してください" };
  }
  if (Number.isInteger(threads) === false) {
    return { error: true, helperText: "整数値を入力してください" };
  }
  return { error: false, helperText: null };
};

const checkB0Error = (b0: number): { error: boolean; helperText: string | null } => {
  if (isNaN(b0)) {
    return { error: true, helperText: "実数値を入力してください" };
  }
  if (b0 <= 0) {
    return { error: true, helperText: "0より大きい実数を入力してください" };
  }
  return { error: false, helperText: null };
};

export default ParamsInput;
