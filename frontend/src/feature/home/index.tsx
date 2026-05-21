import { Stack, type SxProps } from "@mui/material";
import Logo from "./component/Header/Logo";
import Buttons from "./component/Header/Buttons/Buttons";

const Home = () => {
  const sx: SxProps = {
    height: "15vh",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: 1,
  };
  return (
    <div>
      <Stack sx={sx} direction="row">
        <Logo />
        <Buttons />
      </Stack>
    </div>
  );
};

export default Home;
