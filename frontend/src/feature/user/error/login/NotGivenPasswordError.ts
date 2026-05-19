import ApiError from "@/error/ApiError";

class NotGivenPasswordError extends ApiError {
  static {
    this.prototype.name = "NotGivenPasswordError";
  }
}

export default NotGivenPasswordError;
