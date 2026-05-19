import ApiError from "@/error/ApiError";

class DisablesUserError extends ApiError {
  static {
    this.prototype.name = "DisabledUserError";
  }
}

export default DisablesUserError;
