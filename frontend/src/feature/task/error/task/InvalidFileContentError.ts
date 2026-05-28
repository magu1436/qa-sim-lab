import ApiError from "@/error/ApiError";

class InvalidFileContentError extends ApiError {
  static {
    this.prototype.name = "InvalidFileContentError";
  }
}

export default InvalidFileContentError;
