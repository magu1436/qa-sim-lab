import Pagination from "@mui/material/Pagination";
import useTaskRequest from "@/feature/task/hook/useTaskRequest";
import { useCallback, useEffect, useState } from "react";
import useTableTasks from "@/feature/task/hook/useTableTasks";

const TaskTablePagination = () => {
  const { taskRequest, setTaskRequest } = useTaskRequest();
  const { tasks, totalTasks } = useTableTasks();
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(Math.ceil(totalTasks / tasks.length));

  const handlePageChange = useCallback(
    (_: any, page: number) => {
      setPage(page);
      setTaskRequest((prev) => {
        const rowsPerPage = taskRequest.elemEnd - taskRequest.elemStart;
        return {
          ...prev,
          elemStart: rowsPerPage * (page - 1),
          elemEnd: rowsPerPage * page,
        };
      });
    },
    [setPage, taskRequest, setTaskRequest],
  );

  useEffect(() => {
    setCount(Math.ceil(totalTasks / tasks.length));
  }, [tasks, totalTasks]);

  return (
    <>
      <Pagination count={count} page={page} onChange={handlePageChange} siblingCount={2} />
    </>
  );
};

export default TaskTablePagination;
