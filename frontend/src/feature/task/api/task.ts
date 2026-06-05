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
import type { TaskPostOutput, TaskPostRequest } from "../type/api";
import { sleep } from "@/util/sleep";

export default class TaskApi {
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
        min_values: [{ state: 1, value: 0.221 }, { state: 6, value: 0.001 }, { state: 2, value: 0 }],
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
}
