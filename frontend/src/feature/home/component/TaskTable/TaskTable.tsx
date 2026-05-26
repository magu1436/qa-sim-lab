import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import TaskTableHeader from "./TaskTableHeader";
import useTableTasks from "@/feature/task/hook/useTableTasks";
import TableRow from "./TableRow";

const paperSx = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const tableContainerSx = {
  height: "100%",
};

const TaskTable = () => {
  const { tasks } = useTableTasks();
  return (
    <>
      <Paper sx={paperSx}>
        <TableContainer sx={tableContainerSx}>
          <Table stickyHeader aria-label="sticky table">
            <TaskTableHeader />
            <TableBody>
              {tasks.map((task) => {
                return <TableRow key={task.id} data={task} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default TaskTable;
