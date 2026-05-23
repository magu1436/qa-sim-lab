import useLogoutMutation from "@/feature/user/hook/logout";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const m = useLogoutMutation();
  const handleClick = () => {
    m.mutate();
  };
  return (
    <Button variant="contained" onClick={handleClick}>
      ログアウト
    </Button>
  );
};

export default LogoutButton;
