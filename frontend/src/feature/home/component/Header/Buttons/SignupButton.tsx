import { Button } from "@mui/material";
import { useState } from "react";
import SignupDialog from "./SignupDialog";

const SignupButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="submit" onClick={() => setOpen(true)}>
        新規登録
      </Button>
      <SignupDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default SignupButton;
