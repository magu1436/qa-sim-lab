import ApiError from "@/error/ApiError";

class LoginFailedError extends ApiError {
  static {
    this.prototype.name = "LoginFailedError";
  }
}

export default LoginFailedError;
