import ApiError from "@/error/ApiError";

class InvalidDevelopTimeMethodError extends ApiError {
  static {
    this.prototype.name = "InvalidDevelopTimeMethodError";
  }
}

export default InvalidDevelopTimeMethodError;
