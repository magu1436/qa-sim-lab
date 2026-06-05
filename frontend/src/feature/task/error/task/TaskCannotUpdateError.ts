import ApiError from "@/error/ApiError";

class TaskCannotUpdateError extends ApiError {
  static {
    this.prototype.name = "TaskCannotUpdateError";
  }
}

export default TaskCannotUpdateError;

