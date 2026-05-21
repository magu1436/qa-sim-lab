import ApiError from "../ApiError";

class UnauthorizedError extends ApiError {
  static {
    this.prototype.name = "UnauthorizedError";
  }

  constructor(message: string) {
    super(message, "UNAUTHORIZED", 401);
  }
}

export default UnauthorizedError;