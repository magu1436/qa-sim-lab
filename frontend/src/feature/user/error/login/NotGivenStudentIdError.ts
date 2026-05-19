import ApiError from "@/error/ApiError";

class NotGivenStudentIdError extends ApiError {
  static {
    this.prototype.name = "NotGivenStudentIdError";
  }
}

export default NotGivenStudentIdError;
