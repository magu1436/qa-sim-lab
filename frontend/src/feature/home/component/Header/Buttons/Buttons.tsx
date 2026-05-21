import { Stack, type SxProps } from "@mui/material";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

const Buttons = () => {
  const sx: SxProps = {
    border: "1px solid black",
    padding: 1,
    borderRadius: 2,
  };
  return (
    <>
      <Stack sx={sx}>
        <LoginButton />
        <SignupButton />
      </Stack>
    </>
  );
};

export default Buttons;
