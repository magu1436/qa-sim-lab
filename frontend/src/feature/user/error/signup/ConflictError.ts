import ApiError from "@/error/ApiError";

class ConflictError extends ApiError {
  static {
    this.prototype.name = "ConflictError";
  }
}

export default ConflictError;
