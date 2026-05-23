import { IconButton } from "@mui/material";
import Icon from "@mui/icons-material/ManageAccounts";
import UserMenu from "./UserMenu";
import { useState } from "react";

const UserMenuButton = () => {
    const [ open, setOpen ] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Icon />
      </IconButton>
      <UserMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default UserMenuButton;