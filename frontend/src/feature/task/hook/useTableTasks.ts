import { TableTaskContext } from "@/feature/home/component/TableTaskContext";
import { useContext } from "react";

const useTableTasks = () => {
  const val = useContext(TableTaskContext);
  if (val === null) {
    throw new Error("useTableTasks must be used within a TableTasksProvider");
  }
  return val;
};

export default useTableTasks;