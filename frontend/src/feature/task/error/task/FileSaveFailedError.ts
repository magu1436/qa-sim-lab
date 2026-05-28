import ApiError from "@/error/ApiError";

class FileSaveFailedError extends ApiError {
  static {
    this.prototype.name = "FileSaveFailedError";
  }
}

export default FileSaveFailedError;
