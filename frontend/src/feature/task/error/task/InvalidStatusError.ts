import ApiError from "@/error/ApiError";

class InvalidStatusError extends ApiError {
  static {
    this.prototype.name = "InvalidStatusError";
  }
}

export default InvalidStatusError;

