import { Stack } from "@mui/material";
import TaskTablePagination from "./TaskTablePagination";
import TableTaskLoading from "./TableTaskLoading";
import CreateTaskButton from "./CreateTaskButton";

const TaskTableToolbar = () => {
  return (
    <>
      <Stack direction={"row"} sx={{ alignItems: "center", height: 60, justifyContent: "space-between", padding: 1 }} spacing={2}>
        <TaskTablePagination />
        <Stack direction={"row"} spacing={2} sx={{ height: "100%" }}>
          <TableTaskLoading />
          <CreateTaskButton />
        </Stack>
      </Stack>
    </>
  );
};

export default TaskTableToolbar;
