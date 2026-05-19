import { TextField } from "@mui/material";
import { useCallback, useEffect, useState, type FC } from "react";
import Dialog from "@/component/Dialog";
import PasswordTextField from "@/component/PasswordTextField";
import DisabledUserError from "@/feature/user/error/login/DisabledUserError";
import LoginFailedError from "@/feature/user/error/login/LoginFailedError";
import NotGivenPasswordError from "@/feature/user/error/login/NotGivenPasswordError";
import NotGivenStudentIdError from "@/feature/user/error/login/NotGivenStudentIdError";
import useLoginMutation from "@/feature/user/hook/login";

type LoginDialogProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const LoginDialog: FC<LoginDialogProps> = ({ open, setOpen }) => {

  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [studentIdHelperText, setStudentIdHelperText] = useState<string>();
  const [passwordHelperText, setPasswordHelperText] = useState<string>();

  const mutation = useLoginMutation();

  useEffect(() => {
    if (mutation.isError) {
      if (mutation.error instanceof NotGivenPasswordError) {
        setPasswordHelperText("パスワードは必須です。");
      }
      if (mutation.error instanceof NotGivenStudentIdError) {
        setStudentIdHelperText("学籍番号は必須です。");
      }
      if (mutation.error instanceof LoginFailedError) {
        setPasswordHelperText("ログインに失敗しました。");
        setStudentIdHelperText("ログインに失敗しました。");
      }
      if (mutation.error instanceof DisabledUserError) {
        setStudentIdHelperText("アカウントが無効です。");
      }
      return;
    }
    setStudentIdHelperText(undefined);
    setPasswordHelperText(undefined);
  }, [mutation, setStudentIdHelperText, setPasswordHelperText]);

  const handleStudentIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStudentId(e.target.value);
      setStudentIdHelperText(undefined);
    },
    [setStudentId, setStudentIdHelperText],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setPasswordHelperText(undefined);
    },
    [setPassword, setPasswordHelperText],
  );

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      title="ログイン"
      actions={{
        submitButtonlabel: "ログイン",
        cancelButtonLabel: "キャンセル",
        onSubmit: () => setOpen(false),
        onCancel: () => setOpen(false),
      }}
    >
      <TextField
        label="学籍番号"
        variant={mutation.isPending ? "filled" : "outlined"}
        value={studentId}
        placeholder="xDIMxxxx"
        onChange={handleStudentIdChange}
        helperText={studentIdHelperText}
      />
      <PasswordTextField
        label="パスワード"
        variant={mutation.isPending ? "filled" : "outlined"}
        password={password}
        placeHolder="password"
        onChange={handlePasswordChange}
        helperText={passwordHelperText}
      />
    </Dialog>
  );
};

export default LoginDialog;
