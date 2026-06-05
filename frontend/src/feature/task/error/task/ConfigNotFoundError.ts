import ApiError from "@/error/ApiError";

class ConfigNotFoundError extends ApiError {
  static {
    this.prototype.name = "ConfigNotFoundError";
  }
}

export default ConfigNotFoundError;

