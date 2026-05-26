import ApiError from "@/error/ApiError";

class InvalidDateFormatError extends ApiError {
  static {
    this.prototype.name = "InvalidDateFormatError";
  }
}

export default InvalidDateFormatError;
