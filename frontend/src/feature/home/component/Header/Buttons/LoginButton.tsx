import { Button } from "@mui/material";
import { useState } from "react";
import LoginDialog from "./LoginDialog";

const LoginButton = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button type="submit" onClick={() => setOpen(true)}>ログイン</Button>
            <LoginDialog open={open} setOpen={setOpen} />
        </>
    );
};

export default LoginButton;