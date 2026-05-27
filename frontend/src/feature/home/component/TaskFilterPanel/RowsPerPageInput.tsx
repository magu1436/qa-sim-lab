import useTaskRequest from "@/feature/task/hook/useTaskRequest";
import { TextField, type SxProps } from "@mui/material";
import { useCallback, useState } from "react";

type RowsPerpageInputProps = {
  sx?: SxProps;
};

const RowsPerPageInput = ({ sx }: RowsPerpageInputProps) => {
  const { taskRequest, setTaskRequest } = useTaskRequest();
  const [value, setValue] = useState<number>(50);
  const [helperText, setHelperText] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value.trim());
      setValue(val);
      setHelperText(null);
    },
    [setValue, setHelperText],
  );
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.trim());
    if (isNaN(value)) {
      setHelperText("数値を入力してください");
      return;
    }
    if (value < 1) {
      setHelperText("1以上の数値を入力してください");
      return;
    }
    if (Number.isInteger(value) === false) {
      setHelperText("整数値を入力してください");
      return;
    }
    if (taskRequest.elemEnd !== value) {
      setTaskRequest((prev) => ({ ...prev, elemStart: 0, elemEnd: value }));
    }
    setHelperText(null);
  }, [taskRequest, setTaskRequest, setHelperText]);

  return (
    <>
      <TextField
        sx={sx}
        value={value}
        onChange={handleChange}
        label={"取得件数"}
        type="number"
        onBlur={handleBlur}
        helperText={helperText}
        error={helperText !== null}
      />
    </>
  );
};

export default RowsPerPageInput;
