import { AxiosError } from "axios";
import type { LoginApi } from "../type/api";
import NotGivenStudentIdError from "../error/login/NotGivenStudentIdError";
import NotGivenPasswordError from "../error/login/NotGivenPasswordError";
import DisabledUserError from "../error/login/DisabledUserError";
import LoginFailedError from "../error/login/LoginFailedError";

const login = async (data: LoginApi) => {
  try {
    // TODO: login
    console.log("login: ", data);
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.response?.data.code) {
        case "STUDENT_ID_REQUIRED":
          throw new NotGivenStudentIdError("学籍番号を入力してください", "STUDENT_ID_REQUIRED", 400);
        case "PASSWORD_REQUIRED":
          throw new NotGivenPasswordError("パスワードを入力してください", "PASSWORD_REQUIRED", 400);
        case "USER_DISABLED":
          throw new DisabledUserError("アカウントが無効です", "DISABLED_USER", 400);
        case "LOGIN_FAILED":
          throw new LoginFailedError("ログインに失敗しました", "LOGIN_FAILED", 400);
      }
    }
    throw error;
  }
};

export default login;
