import { Box } from "@mui/material";
import Logo from "./component/Header/Logo";
import LoginButton from "./component/Header/Buttons/LoginButton";
import SignupButton from "./component/Header/Buttons/SignupButton";

const Home = () => {
  return (
    <div>
      <Box sx={{height: "30vh", width: "100%"}}>
        <Logo />
        <LoginButton />
        <SignupButton />
      </Box>
    </div>
  );
};

export default Home;
