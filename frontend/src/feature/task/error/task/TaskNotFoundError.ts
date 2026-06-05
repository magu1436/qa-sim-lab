import ApiError from "@/error/ApiError";

class TaskNotFoundError extends ApiError {
  static {
    this.prototype.name = "TaskNotFoundError";
  }
}

export default TaskNotFoundError;

