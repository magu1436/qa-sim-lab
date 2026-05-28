import ApiError from "@/error/ApiError";

class ProblemNameRequiredError extends ApiError {
  static {
    this.prototype.name = "ProblemNameRequiredError";
  }
}

export default ProblemNameRequiredError;
