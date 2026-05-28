import ApiError from "@/error/ApiError";

class InvalidElementNumsError extends ApiError {
  static {
    this.prototype.name = "InvalidElementNumsError";
  }
}

export default InvalidElementNumsError;
