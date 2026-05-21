import { Stack, type SxProps } from "@mui/material";
import Logo from "./Logo";
import Buttons from "./Buttons/Buttons";
import CurrentUserBadge from "./CurrentUserBadge";
import useAuthUser from "@/feature/user/hook/useAuthUser";

const Header = () => {
  const { isLoggedIn } = useAuthUser();
  const sx: SxProps = {
    height: 100,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: 1,
    padding: 1,
  };
  return (
    <>
      <Stack sx={sx} direction="row">
        <Logo />
        {isLoggedIn ? <CurrentUserBadge /> : <Buttons />}
      </Stack>
    </>
  );
};

export default Header;
