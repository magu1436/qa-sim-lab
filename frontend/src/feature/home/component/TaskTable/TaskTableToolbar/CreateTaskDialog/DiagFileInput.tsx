import FileInputField from "@/component/FileInputField";
import useCreateTaskDialogContext from "@/feature/home/hook/useCreateTaskDialogContext";
import { Divider, Stack, Typography } from "@mui/material";
import { useCallback } from "react";

const DiagFileInput = () => {
  const { task, setTask, helperTexts, setHelperText } = useCreateTaskDialogContext();

  const handleDiagFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setTask(
          (prev) =>
            prev && {
              ...prev,
              inputFile: file,
            },
        );
      }
      setHelperText("inputFile", null);
    },
    [setTask, setHelperText],
  );

  return (
    <Stack spacing={1}>
      <Typography variant="h6" >対角項データファイル</Typography>
      <Divider />
      <FileInputField
        file={task?.inputFile || null}
        onChange={handleDiagFileChange}
        errorMessage={helperTexts.inputFile || ""}
        accept={[".csv", ".bin"]}
      />
    </Stack>
  );
};

export default DiagFileInput;
