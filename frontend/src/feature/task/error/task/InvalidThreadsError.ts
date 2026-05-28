import ApiError from "@/error/ApiError";

class InvalidThreadsError extends ApiError {
  static {
    this.prototype.name = "InvalidThreadsError";
  }
}

export default InvalidThreadsError;
