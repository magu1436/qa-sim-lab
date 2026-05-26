import ApiError from "@/error/ApiError";

class InvalidRangeError extends ApiError {
  static {
    this.prototype.name = "InvalidRangeError";
  }
}

export default InvalidRangeError;
