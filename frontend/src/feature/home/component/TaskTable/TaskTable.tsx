import { Paper, Stack, type SxProps } from "@mui/material";
import TaskTableBody from "./TaskTableBody/TaskTableBody";
import TaskTableToolbar from "./TaskTableToolbar/TaskTableToolbar";

const paperSx: SxProps = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const stackSx: SxProps = {
  height: "100%",
  minHeight: 0,
}

const tableSx = {
  flex: 1,
  minHeight: 0,
}

const TaskTable = () => {
  return (
    <>
      <Paper sx={paperSx}>
        <Stack sx={stackSx}>
          <TaskTableToolbar />
          <TaskTableBody sx={tableSx}/>
        </Stack>
      </Paper>
    </>
  );
};

export default TaskTable;
