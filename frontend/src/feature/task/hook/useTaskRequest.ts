import { TaskRequestContext } from "@/feature/home/component/TaskRequestContext";
import { useContext } from "react";

const useTaskRequest = () => {
  const val = useContext(TaskRequestContext);
  if (val === null) {
    throw new Error("useTaskRequest must be used within a TaskRequestProvider");
  }
  return val;
};

export default useTaskRequest;