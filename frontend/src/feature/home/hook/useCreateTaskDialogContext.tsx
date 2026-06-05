import { useContext } from "react";
import { CreateTaskDialogContext } from "../component/TaskTable/TaskTableToolbar/CreateTaskDialog/CreateTaskContext";

const useCreateTaskDialogContext = () => {
  const val = useContext(CreateTaskDialogContext);
  if (val === null) {
    throw new Error("useCreateTaskDialogContext must be used within a CreateTaskDialogProvider");
  }
  return val;
};

export default useCreateTaskDialogContext;
