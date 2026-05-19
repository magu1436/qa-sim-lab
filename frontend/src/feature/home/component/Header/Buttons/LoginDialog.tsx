import { Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState, type FC } from "react";
import Dialog from "@/component/Dialog";
import PasswordTextField from "@/component/PasswordTextField";
import DisabledUserError from "@/feature/user/error/login/DisabledUserError";
import LoginFailedError from "@/feature/user/error/login/LoginFailedError";
import NotGivenPasswordError from "@/feature/user/error/login/NotGivenPasswordError";
import NotGivenStudentIdError from "@/feature/user/error/login/NotGivenStudentIdError";
import useLoginMutation from "@/feature/user/hook/login";

type LoginDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginDialog: FC<LoginDialogProps> = ({ open, setOpen }) => {
  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [studentIdHelperText, setStudentIdHelperText] = useState<string>();
  const [passwordHelperText, setPasswordHelperText] = useState<string>();

  const mutation = useLoginMutation();

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

  const handleSubmit = useCallback(() => {
    if (mutation.isPending) return;
    let isError = false;
    if (studentId === "") {
      setStudentIdHelperText("学籍番号は必須です。");
      isError = true;
    }
    if (password === "") {
      setPasswordHelperText("パスワードは必須です。");
      isError = true;
    }
    if (isError) return;
    const form = {
      student_id: studentId,
      password,
    };
    mutation.mutate(form);
  }, [mutation, studentId, password]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    setStudentId("");
    setPassword("");
  }, [setOpen, setStudentId, setPassword]);

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
    if (mutation.isSuccess) {
      handleCancel();
      mutation.reset();
    }
  }, [mutation, setStudentIdHelperText, setPasswordHelperText]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      title="ログイン"
      actions={{
        submitButtonlabel: "ログイン",
        cancelButtonLabel: "キャンセル",
        onSubmit: handleSubmit,
        onCancel: handleCancel,
      }}
    >
      <Stack spacing={2} direction={"column"}>
        <TextField
          label="学籍番号"
          variant={mutation.isPending ? "filled" : "outlined"}
          value={studentId}
          placeholder="xDIMxxxx"
          onChange={handleStudentIdChange}
          helperText={studentIdHelperText}
          error={studentIdHelperText !== undefined}
        />
        <PasswordTextField
          label="パスワード"
          variant={mutation.isPending ? "filled" : "outlined"}
          password={password}
          placeHolder="password"
          onChange={handlePasswordChange}
          helperText={passwordHelperText}
          error={passwordHelperText !== undefined}
        />
      </Stack>
    </Dialog>
  );
};

export default LoginDialog;
