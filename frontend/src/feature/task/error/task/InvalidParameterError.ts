import ApiError from "@/error/ApiError";

class InvalidParameterError extends ApiError {
  static {
    this.prototype.name = "InvalidParameterError";
  }
}

export default InvalidParameterError;
