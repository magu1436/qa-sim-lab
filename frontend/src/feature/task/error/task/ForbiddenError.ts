import ApiError from "@/error/ApiError";

class ForbiddenError extends ApiError {
  static {
    this.prototype.name = "ForbiddenError";
  }
}

export default ForbiddenError;

