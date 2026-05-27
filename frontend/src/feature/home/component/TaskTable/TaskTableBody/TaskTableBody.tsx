import { Table, TableBody, TableContainer, type SxProps } from "@mui/material";
import TaskTableHeader from "./TaskTableHeader";
import useTableTasks from "@/feature/task/hook/useTableTasks";
import TableRow from "./TableRow";
import type { FC } from "react";

type TaskTableBodyProps = {
    sx?: SxProps
};

const TaskTableBody: FC<TaskTableBodyProps> = ({ sx }) => {
  const { tasks } = useTableTasks();
  return (
    <>
      <TableContainer sx={sx}>
        <Table stickyHeader>
          <TaskTableHeader />
          <TableBody>
            {tasks.map((task) => {
              return <TableRow key={task.id} data={task} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskTableBody;
