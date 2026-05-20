import ApiError from "@/error/ApiError";

class PasswordInvalidCharactersError extends ApiError {
  static {
    this.prototype.name = "PasswordInvalidCharactersError";
  }
}

export default PasswordInvalidCharactersError;
