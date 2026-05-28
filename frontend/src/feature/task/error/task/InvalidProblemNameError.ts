import ApiError from "@/error/ApiError";

class InvalidProblemNameError extends ApiError {
  static {
    this.prototype.name = "InvalidProblemNameError";
  }
}

export default InvalidProblemNameError;
