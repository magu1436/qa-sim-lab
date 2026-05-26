import { TableTaskContext } from "@/feature/home/component/TableTaskContext";
import { useContext } from "react";

const iseTableTasks = () => {
  const val = useContext(TableTaskContext);
  if (val === null) {
    throw new Error("useTableTasks must be used within a TableTasksProvider");
  }
  return val;
};

export default iseTableTasks;