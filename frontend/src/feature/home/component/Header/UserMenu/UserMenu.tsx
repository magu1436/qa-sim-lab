import useAuthUser from "@/feature/user/hook/useAuthUser";
import { Drawer, Stack, Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useCallback, useEffect, useState, type FC } from "react";
import Name from "./Name";
import StudentId from "./StudentId";
import type { UserMePatchApi } from "@/feature/user/type/api";
import useUserUpdate from "@/feature/user/hook/useUserUpdate";
import Mail from "./Mail";
import LogoutButton from "./LogoutButton";

type UserMenuProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserMenu: FC<UserMenuProps> = ({ open, setOpen }) => {
  const { user } = useAuthUser();
  const [isInput, setIsInput] = useState(false);

  const [name, setName] = useState(user?.name);
  const [nameHelperText, setNameHelperText] = useState<string>();
  const [studentId, setStudentId] = useState(user?.studentId);
  const [studentIdHelperText, setStudentIdHelperText] = useState<string>();
  const [mail, setMail] = useState(user?.mail);
  const [mailHelperText, setMailHelperText] = useState<string>();

  const handleClose = useCallback(() => {
    setOpen(false);
    setIsInput(false);
  }, [setOpen, setIsInput]);

  useEffect(() => {
    setName(user?.name);
    setStudentId(user?.studentId);
    setMail(user?.mail);
    if (!user) {
      handleClose();
    }
  }, [user, setOpen, setIsInput]);

  const userUpdateMutation = useUserUpdate();

  const handleEditButton = useCallback(() => {
    if (isInput) {
      let newUser: UserMePatchApi = {};
      let flag = false;
      if (name !== user?.name) {
        if (name !== "") {
          newUser.name = name;
        } else {
          setNameHelperText("名前を入力してください");
          flag = true;
        }
      }
      if (studentId !== user?.studentId) {
        if (studentId !== "") {
          newUser.student_id = studentId;
        } else {
          setStudentIdHelperText("学生証番号を入力してください");
          flag = true;
        }
      }
      if (mail !== user?.mail) {
        if (mail !== "") {
          newUser.mail = mail;
        } else {
          setMailHelperText("メールアドレスを入力してください");
          flag = true;
        }
      }
      if (flag) {
        return;
      }
      userUpdateMutation.mutate(newUser);
    }
    setIsInput(!isInput);
  }, [
    isInput,
    setIsInput,
    name,
    studentId,
    mail,
    userUpdateMutation,
    setName,
    setStudentId,
    setMail,
    setNameHelperText,
    setStudentIdHelperText,
    setMailHelperText,
  ]);

  const handleCancelButton = useCallback(() => {
    setIsInput(false);
    setName(user?.name);
    setStudentId(user?.studentId);
    setMail(user?.mail);
    setNameHelperText(undefined);
    setStudentIdHelperText(undefined);
    setMailHelperText(undefined);
  }, [setIsInput]);

  return (
    <>
      <Drawer anchor="right" open={open} onClose={handleClose} slotProps={{
        paper: {
          sx: {
            width: 400
          }
        }
      }}>
        <Stack direction={"column"} sx={{ alignItems: "center", padding: 2 }} spacing={2}>
          <Name isInput={isInput} value={name} onChange={setName} helperText={nameHelperText} />
          <StudentId
            isInput={isInput}
            value={studentId}
            onChange={setStudentId}
            helperText={studentIdHelperText}
          />
          <Mail isInput={isInput} value={mail} onChange={setMail} helperText={mailHelperText} />

          <Stack direction={"row"} sx={{ justifyContent: "flex-end", width: "100%" }} spacing={1}>
            {isInput && (
              <Button variant="outlined" onClick={handleCancelButton}>
                {"キャンセル"}
              </Button>
            )}
            <Button variant="contained" endIcon={<ModeEditIcon />} onClick={handleEditButton}>
              {isInput ? "保存" : "編集"}
            </Button>
          </Stack>

          <LogoutButton />
        </Stack>
      </Drawer>
    </>
  );
};

export default UserMenu;
