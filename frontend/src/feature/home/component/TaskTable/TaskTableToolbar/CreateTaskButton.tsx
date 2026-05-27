import { AddCircleOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

const CreateTaskButton = () => {
  return (
    <Button variant="contained" startIcon={<AddCircleOutlined />}>
      タスクを作成
    </Button>
  );
};

export default CreateTaskButton;
