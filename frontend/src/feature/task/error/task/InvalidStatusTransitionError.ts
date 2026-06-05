import ApiError from "@/error/ApiError";

class InvalidStatusTransitionError extends ApiError {
  static {
    this.prototype.name = "InvalidStatusTransitionError";
  }
}

export default InvalidStatusTransitionError;

