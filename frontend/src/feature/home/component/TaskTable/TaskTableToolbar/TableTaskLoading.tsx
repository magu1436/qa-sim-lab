import useTableTasks from "@/feature/task/hook/useTableTasks";
import { CircularProgress } from "@mui/material";

const TableTaskLoading = () => {
  const { isLoading } = useTableTasks();
  if (!isLoading) return null;
  return <CircularProgress />;
};

export default TableTaskLoading;
