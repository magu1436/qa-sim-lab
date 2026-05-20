import ApiError from "@/error/ApiError";

class InvalidMailFormError extends ApiError {
  static {
    this.prototype.name = "InvalidMailFormError";
  }
}

export default InvalidMailFormError;
