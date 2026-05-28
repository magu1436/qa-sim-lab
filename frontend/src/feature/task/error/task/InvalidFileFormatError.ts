import ApiError from "@/error/ApiError";

class InvalidFileFormatError extends ApiError {
  static {
    this.prototype.name = "InvalidFileFormatError";
  }
}

export default InvalidFileFormatError;
