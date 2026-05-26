import ApiError from "@/error/ApiError";

class InvalidOrderError extends ApiError {
  static {
    this.prototype.name = "InvalidOrderError";
  }
}

export default InvalidOrderError;
