import ApiError from "@/error/ApiError";

class UnauthorizedError extends ApiError {
  static {
    this.prototype.name = "UnauthorizedError";
  }
}

export default UnauthorizedError;
