import useTaskRequest from "@/feature/task/hook/useTaskRequest";
import { ALL_STATUS, type Status } from "@/feature/task/type/table";
import {
  Autocomplete,
  TextField,
  type AutocompleteRenderInputParams,
  type SxProps,
} from "@mui/material";
import { useCallback, type FC } from "react";

type StatusInputProps = {
  sx?: SxProps;
};

const StatusInput: FC<StatusInputProps> = ({ sx }) => {
  const { taskRequest, setTaskRequest } = useTaskRequest();

  const handleChange = useCallback(
    (_: any, value: Status | null) => {
      if (taskRequest.status === value) return;
      setTaskRequest((prev) => ({ ...prev, status: value }));
    },
    [setTaskRequest, taskRequest],
  );

  const handleRender = useCallback((params: AutocompleteRenderInputParams) => {
    return (
      <>
        <TextField {...params} label={"進行状況"} />
      </>
    );
  }, []);
  return (
    <>
      <Autocomplete
        sx={sx}
        onChange={handleChange}
        options={ALL_STATUS}
        disablePortal
        renderInput={handleRender}
      />
    </>
  );
};

export default StatusInput;
