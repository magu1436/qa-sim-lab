import { AxiosError } from "axios";
import FileSaveFailedError from "../error/task/FileSaveFailedError";
import InvalidDevelopTimeMethodError from "../error/task/InvalidDevelopTimeMethodError";
import InvalidElementNumsError from "../error/task/InvalidElementNumsError";
import InvalidFileContentError from "../error/task/InvalidFileContentError";
import InvalidFileFormatError from "../error/task/InvalidFileFormatError";
import InvalidParameterError from "../error/task/InvalidParameterError";
import InvalidProblemNameError from "../error/task/InvalidProblemNameError";
import InvalidThreadsError from "../error/task/InvalidThreadsError";
import LackOfValueError from "../error/task/LackOfValueError";
import ProblemNameRequiredError from "../error/task/ProblemNameRequiredError";
import UnauthorizedError from "../error/task/UnauthorizedError";
import type {
  TaskConfigPatchInput,
  TaskGetOutput,
  TaskPatchInput,
  TaskPostOutput,
  TaskPostRequest,
} from "../type/api";
import { sleep } from "@/util/sleep";
import InvalidTaskId from "../error/task/InvalidTaskId";
import NotFoundError from "@/error/common_errors/NotFoundError";
import TaskCannotUpdateError from "../error/task/TaskCannotUpdateError";
import TaskNotFoundError from "../error/task/TaskNotFoundError";
import ConfigNotFoundError from "../error/task/ConfigNotFoundError";
import ForbiddenError from "@/error/common_errors/ForbiddenError";
import InvalidStatusError from "../error/task/InvalidStatusError";
import InvalidStatusTransitionError from "../error/task/InvalidStatusTransitionError";
import TaskForbiddenError from "../error/task/ForbiddenError";

class Config {
  static async patch(request: TaskConfigPatchInput): Promise<void> {
    try {
      // TODO: task/config/patch with PATCH method
      console.log(`task/config/patch: ${request.task_id}`, request);
      await sleep(1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.data.code) {
          case "LACK_OF_VALUE":
            throw new LackOfValueError("Required value is missing", "LACK_OF_VALUE", 400);
          case "INVALID_TASK_ID":
            throw new InvalidTaskId("Task id is invalid", "INVALID_TASK_ID", 400);
          case "INVALID_PARAMETER":
            throw new InvalidParameterError("Parameter is invalid", "INVALID_PARAMETER", 400);
          case "INVALID_THREADS":
            throw new InvalidThreadsError("Threads is invalid", "INVALID_THREADS", 400);
          case "INVALID_DEVELOP_TIME_METHOD":
            throw new InvalidDevelopTimeMethodError(
              "Develop time method is invalid",
              "INVALID_DEVELOP_TIME_METHOD",
              400,
            );
          case "TASK_CANNOT_UPDATE":
            throw new TaskCannotUpdateError("Task cannot update", "TASK_CANNOT_UPDATE", 400);
          case "UNAUTHORIZED":
            throw new UnauthorizedError("Unauthorized", "UNAUTHORIZED", 401);
          case "FORBIDDEN":
            throw new ForbiddenError("Forbidden");
          case "TASK_NOT_FOUND":
            throw new TaskNotFoundError("Task not found", "TASK_NOT_FOUND", 404);
          case "CONFIG_NOT_FOUND":
            throw new ConfigNotFoundError("Config not found", "CONFIG_NOT_FOUND", 404);
        }
      }
      throw error;
    }
  }
}

export default class TaskApi {
  static config = Config;

  static async post(request: TaskPostRequest): Promise<TaskPostOutput> {
    try {
      const formData = new FormData();
      if (request.task_name !== null) {
        formData.append("task_name", request.task_name);
      }
      formData.append("problem_name", request.problem_name);
      formData.append("dt", String(request.dt));
      formData.append("tau", String(request.tau));
      formData.append("b0", String(request.b0));
      formData.append("threads", String(request.threads));
      formData.append("develop_time_method", request.develop_time_method);
      if (request.memo !== null) {
        formData.append("memo", request.memo);
      }
      formData.append("input_file", request.input_file);

      console.log(`task/post:`, request);
      await sleep(1000);
      return {
        id: 1,
        min_values: [
          { state: 1, value: 0.221 },
          { state: 6, value: 0.001 },
          { state: 2, value: 0 },
        ],
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.data.code) {
          case "LACK_OF_VALUE":
            throw new LackOfValueError("Required value is missing", "LACK_OF_VALUE", 400);
          case "PROBLEM_NAME_REQUIRED":
            throw new ProblemNameRequiredError(
              "Problem name is required",
              "PROBLEM_NAME_REQUIRED",
              400,
            );
          case "INVALID_PROBLEM_NAME":
            throw new InvalidProblemNameError(
              "Problem name is too long",
              "INVALID_PROBLEM_NAME",
              400,
            );
          case "INVALID_PARAMETER":
            throw new InvalidParameterError("Parameter is invalid", "INVALID_PARAMETER", 400);
          case "INVALID_THREADS":
            throw new InvalidThreadsError("Threads is invalid", "INVALID_THREADS", 400);
          case "INVALID_FILE_FORMAT":
            throw new InvalidFileFormatError(
              "Input file format is invalid",
              "INVALID_FILE_FORMAT",
              400,
            );
          case "INVALID_DEVELOP_TIME_METHOD":
            throw new InvalidDevelopTimeMethodError(
              "Develop time method is invalid",
              "INVALID_DEVELOP_TIME_METHOD",
              400,
            );
          case "INVALID_ELEMENT_NUMS":
            throw new InvalidElementNumsError(
              "Element nums is invalid",
              "INVALID_ELEMENT_NUMS",
              400,
            );
          case "INVALID_FILE_CONTENT":
            throw new InvalidFileContentError(
              "Input file content is invalid",
              "INVALID_FILE_CONTENT",
              400,
            );
          case "UNAUTHORIZED":
            throw new UnauthorizedError("Unauthorized", "UNAUTHORIZED", 401);
          case "FILE_SAVE_FAILED":
            throw new FileSaveFailedError("File save failed", "FILE_SAVE_FAILED", 500);
        }
      }
      throw error;
    }
  }
  static async get(id: number): Promise<TaskGetOutput> {
    try {
      // TODO: task/get with GET method
      console.log(`task/get: ${id}`);
      await sleep(1000);
      return {
        id: 1,
        problem_name: "problem_name",
        name: "name",
        memo: "memo",
        config: {
          dt: 0.1,
          tau: 1,
          b0: 1,
          threads: 32,
          develop_time_method: "AUTO",
          input_file: null,
        },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.data.code) {
          case "INVALID_TASK_ID":
            throw new InvalidTaskId("Task id is invalid", "INVALID_TASK_ID", 400);
          case "TASK_NOT_FOUND":
            throw new NotFoundError("Task not found");
        }
      }
      throw error;
    }
  }

  static async patch(request: TaskPatchInput): Promise<void> {
    try {
      // TODO: task/patch with PATCH method
      console.log(`task/patch:`, request);
      await sleep(1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.data.code) {
          case "LACK_OF_VALUE":
            throw new LackOfValueError("Required value is missing", "LACK_OF_VALUE", 400);
          case "PROBLEM_NAME_REQUIRED":
            throw new ProblemNameRequiredError(
              "Problem name is required",
              "PROBLEM_NAME_REQUIRED",
              400,
            );
          case "INVALID_PROBLEM_NAME":
            throw new InvalidProblemNameError(
              "Problem name is too long",
              "INVALID_PROBLEM_NAME",
              400,
            );
          case "INVALID_TASK_ID":
            throw new InvalidTaskId("Task id is invalid", "INVALID_TASK_ID", 400);
          case "INVALID_STATUS":
            throw new InvalidStatusError("Status is invalid", "INVALID_STATUS", 400);
          case "INVALID_STATUS_TRANSITION":
            throw new InvalidStatusTransitionError(
              "Status transition is invalid",
              "INVALID_STATUS_TRANSITION",
              400,
            );
          case "UNAUTHORIZED":
            throw new UnauthorizedError("Unauthorized", "UNAUTHORIZED", 401);
          case "FORBIDDEN":
            throw new TaskForbiddenError("Forbidden", "FORBIDDEN", 403);
          case "TASK_NOT_FOUND":
            throw new TaskNotFoundError("Task not found", "TASK_NOT_FOUND", 404);
        }
      }
      throw error;
    }
  }
}
