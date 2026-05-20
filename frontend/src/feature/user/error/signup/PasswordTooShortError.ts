import ApiError from "@/error/ApiError";

class PasswordTooShortError extends ApiError {
  static {
    this.prototype.name = "PasswordTooShortError";
  }
}

export default PasswordTooShortError;
