import ApiError from "@/error/ApiError";

class PasswordTooLongError extends ApiError {
  static {
    this.prototype.name = "PasswordTooLongError";
  }
}

export default PasswordTooLongError;
