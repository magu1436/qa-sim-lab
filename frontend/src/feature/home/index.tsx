import { Box } from "@mui/material";
import Logo from "./component/Header/Logo";
import LoginButton from "./component/Header/Buttons/LoginButton";

const Home = () => {
  return (
    <div>
      <Box sx={{height: "30vh", width: "100%"}}>
        <Logo />
        <LoginButton />
      </Box>
    </div>
  );
};

export default Home;
