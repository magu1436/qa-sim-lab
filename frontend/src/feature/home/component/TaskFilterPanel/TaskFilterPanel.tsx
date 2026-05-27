import { Stack, type SxProps } from "@mui/material";
import UserInput from "./UserInput";
import ProblemNameInput from "./ProblemNameInput";
import TaskCreatedAtRangeFilter from "./TaskCreatedAtRangeFilter";
import OrderButtonGroup from "./OrderButtonGroup";
import RowsPerPageInput from "./RowsPerPageInput";
import StatusInput from "./StatusInput";

const sx: SxProps = {
  width: "30vw",
  height: "100%",
  border: 1,
  padding: 1,
  borderRadius: 2,
};

const TaskFilterPanel = () => {
  return (
    <Stack sx={sx} spacing={2} direction={"column"}>
      <OrderButtonGroup />
      <RowsPerPageInput />
      <UserInput />
      <ProblemNameInput />
      <StatusInput />
      <TaskCreatedAtRangeFilter />
    </Stack>
  );
};

export default TaskFilterPanel;
