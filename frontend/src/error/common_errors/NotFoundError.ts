import ApiError from "../ApiError";

class NotFoundError extends ApiError {
  static {
    this.prototype.name = "NotFoundError";
  }
  constructor(message: string) {
    super(message, "NOT_FOUND_ERROR", 404);
  }
}

export default NotFoundError;
