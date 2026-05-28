import ApiError from "@/error/ApiError";

class LackOfValueError extends ApiError {
  static {
    this.prototype.name = "LackOfValueError";
  }
}

export default LackOfValueError;
