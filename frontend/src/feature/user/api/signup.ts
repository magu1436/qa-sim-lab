import axios, { AxiosError } from "axios";
import type { SignUpApi } from "../type/api";
import ConflictError from "../error/signup/ConflictError";
import InvalidMailFormError from "../error/signup/InvalidMailFormError";
import PasswordInvalidCharactersError from "../error/signup/PasswordInvalidCharactersError";
import PasswordTooLongError from "../error/signup/PasswordTooLongError";
import PasswordTooShortError from "../error/signup/PasswordTooShortError";

const signUp = async (data: SignUpApi) => {
  try {
    // TODO: signup
    console.log("signup: ", data);
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.response?.data.code) {
        case "PASSWORD_TOO_SHORT":
          throw new PasswordTooShortError(
            "Password must be at least 6 characters long",
            "PASSWORD_TOO_SHORT",
            400,
          );
        case "PASSWORD_TOO_LONG":
          throw new PasswordTooLongError(
            "Password must be shorter than 64 characters",
            "PASSWORD_TOO_LONG",
            400,
          );
        case "PASSWORD_INVALID_CHARACTARS":
          throw new PasswordInvalidCharactersError(
            "Password must contain only ASCII characters",
            "PASSWORD_INVALID_CHARACTARS",
            400,
          );
        case "MAIL_INVALID_FORM":
          throw new InvalidMailFormError(
            "Mail address format is invalid",
            "MAIL_INVALID_FORM",
            400,
          );
        case "CONFLICT":
          throw new ConflictError(
            "Student ID is already in use",
            "CONFLICT",
            409,
          );
      }
    }
    throw error;
  }
};

export default signUp;
