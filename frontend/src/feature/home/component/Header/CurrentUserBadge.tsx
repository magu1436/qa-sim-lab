import { IconButton, Stack, Typography, type SxProps } from "@mui/material";
import Icon from "@mui/icons-material/ManageAccounts";
import useAuthUser from "@/feature/user/hook/useAuthUser";

const CurrentUserBadge = () => {
  const { user } = useAuthUser();
  const outlineStackSx: SxProps = {
    border: "1px solid black",
    padding: 1,
    borderRadius: 2,
  };
  return (
    <>
      <Stack direction={"row"} sx={outlineStackSx} spacing={1}>
        <Stack sx={{ alignItems: "center" }}>
          <Typography>{user?.name ?? "Anonymous"}</Typography>
          <Typography>{user?.studentId ?? "xCDIMxxxx"}</Typography>
        </Stack>
        <IconButton>
          <Icon />
        </IconButton>
      </Stack>
    </>
  );
};

export default CurrentUserBadge;
