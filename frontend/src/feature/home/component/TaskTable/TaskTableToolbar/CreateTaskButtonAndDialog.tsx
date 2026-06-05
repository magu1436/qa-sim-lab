import { AddCircleOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useCallback } from "react";
import CreateTaskDialog from "./CreateTaskDialog/CreateTaskDialog";
import useCreateTaskDialogContext from "@/feature/home/hook/useCreateTaskDialogContext";
import { CreateTaskDialogContextProvider } from "./CreateTaskDialog/CreateTaskContext";

const CreateTaskButton = () => {
  const { setTask } = useCreateTaskDialogContext();
  const handleClick = useCallback(() => {
    setTask({
      developTimeMethod: "AUTO",
    });
  }, [setTask]);

  return (
    <>
      <Button variant="contained" onClick={handleClick} startIcon={<AddCircleOutlined />}>
        タスクを作成
      </Button>
    </>
  );
};

const CreateTaskButtonAndDialog = () => {
  return (
    <CreateTaskDialogContextProvider>
      <CreateTaskButton />
      <CreateTaskDialog />
    </CreateTaskDialogContextProvider>
  )
}

export default CreateTaskButtonAndDialog;
