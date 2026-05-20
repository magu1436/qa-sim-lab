import { Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState, type FC } from "react";
import Dialog from "@/component/Dialog";
import ConflictError from "@/feature/user/error/signup/ConflictError";
import InvalidMailFormError from "@/feature/user/error/signup/InvalidMailFormError";
import PasswordInvalidCharactersError from "@/feature/user/error/signup/PasswordInvalidCharactersError";
import PasswordTooLongError from "@/feature/user/error/signup/PasswordTooLongError";
import PasswordTooShortError from "@/feature/user/error/signup/PasswordTooShortError";
import useSignUpMutation from "@/feature/user/hook/signup";
import type { SignUpApi } from "@/feature/user/type/api";
import PasswordTextField from "@/component/PasswordTextField";

type SignupDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignupDialog: FC<SignupDialogProps> = ({ open, setOpen }) => {
  const [studentId, setStudentId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [studentIdHelperText, setStudentIdHelperText] = useState<string>();
  const [nameHelperText, setNameHelperText] = useState<string>();
  const [mailHelperText, setMailHelperText] = useState<string>();
  const [passwordHelperText, setPasswordHelperText] = useState<string>();
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState<string>();

  const mutation = useSignUpMutation();

  const handleStudentIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStudentId(e.target.value);
      setStudentIdHelperText(undefined);
    },
    [setStudentId, setStudentIdHelperText],
  );

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      setNameHelperText(undefined);
    },
    [setName, setNameHelperText],
  );

  const handleMailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMail(e.target.value);
      setMailHelperText(undefined);
    },
    [setMail, setMailHelperText],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setPasswordHelperText(undefined);
    },
    [setPassword, setPasswordHelperText],
  );

  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
      setConfirmPasswordHelperText(undefined);
    },
    [setConfirmPassword, setConfirmPasswordHelperText],
  );

  const handleSubmit = useCallback(() => {
    if (mutation.isPending) return;
    let isError = false;
    if (studentId === "") {
      setStudentIdHelperText("学籍番号は必須です。");
      isError = true;
    }
    if (name === "") {
      setNameHelperText("名前は必須です。");
      isError = true;
    }
    if (mail === "") {
      setMailHelperText("メールアドレスは必須です。");
      isError = true;
    }
    if (password === "") {
      setPasswordHelperText("パスワードは必須です。");
      isError = true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordHelperText("パスワードが一致しません。");
      isError = true;
    }
    if (isError) return;
    const form: SignUpApi = {
      student_id: studentId,
      name,
      mail,
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
      if (mutation.error instanceof ConflictError) {
        setStudentIdHelperText("この学生証番号は既に登録されています。");
      }
      if (mutation.error instanceof InvalidMailFormError) {
        setMailHelperText("メールアドレスの形式が不正です。");
      }
      if (mutation.error instanceof PasswordInvalidCharactersError) {
        setPasswordHelperText("パスワードに使用できない文字が含まれています。\nパスワードには半角文字のみ使用できます。");
      }
      if (mutation.error instanceof PasswordTooShortError) {
        setPasswordHelperText("パスワードは6文字以上にしてください。");
      }
      if (mutation.error instanceof PasswordTooLongError) {
        setPasswordHelperText("パスワードは64文字以下にしてください。");
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
      title="アカウント作成"
      actions={{
        submitButtonlabel: "作成",
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
        <TextField
          label="名前"
          variant={mutation.isPending ? "filled" : "outlined"}
          value={name}
          placeholder="東海太郎"
          onChange={handleNameChange}
          helperText={nameHelperText}
          error={nameHelperText !== undefined}
        />
        <TextField
          label="メールアドレス"
          variant={mutation.isPending ? "filled" : "outlined"}
          type="mail"
          value={mail}
          placeholder="xCDIMxxxx@tokai.ac.jp"
          onChange={handleMailChange}
          helperText={mailHelperText}
          error={mailHelperText !== undefined}
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
        <PasswordTextField
          label="確認用パスワード"
          variant={mutation.isPending ? "filled" : "outlined"}
          password={confirmPassword}
          placeHolder="password"
          onChange={handleConfirmPasswordChange}
          helperText={confirmPasswordHelperText}
          error={confirmPasswordHelperText !== undefined}
        />
      </Stack>
    </Dialog>
  );
};

export default SignupDialog;
