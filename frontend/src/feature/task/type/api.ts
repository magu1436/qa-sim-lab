import type { Status } from "./table";
import type { DevelopTimeMethod } from "./task";

export type TableTaskInfoUserApi = {
  name: string;
  student_id: string;
};

export type TableTaskRowDataApi = {
  id: number;
  user: TableTaskInfoUserApi;
  created_at: string;
  status: Status;
  ratio: number;
  problem_name: string;
  name: string;
  memo: string;
};

export type TaskOrderOutputApi = {
  tasks: TableTaskRowDataApi[];
  total_tasks: number;
};

export type TaskOrderInputApi = {
  elem_start: number;
  elem_end: number;
  order: "DESC" | "ASC";
  user: string | null;
  problem_name: string | null;
  date_start: string | null;
  date_end: string | null;
  status: Status | null;
};

export type TaskPostRequest = {
  task_name: string | null;
  problem_name: string;
  dt: number;
  tau: number;
  b0: number;
  threads: number;
  develop_time_method: DevelopTimeMethod;
  memo: string | null;
  input_file: File;
};

export type TaskPostOutput = {
  id: number;
  min_values: {
    state: number;
    value: number;
  }[];
};

export interface InputFileOutput {
  id: number;
  size_bytes: number;
  element_nums: number;
}

export interface TaskConfigOutput {
  dt: number;
  tau: number;
  b0: number;
  threads: number;
  develop_time_method: DevelopTimeMethod;
  input_file: InputFileOutput | null;
}

export interface TaskGetOutput {
  id: number;
  problem_name: string;
  name: string | null;
  memo: string | null;
  config: TaskConfigOutput;
}

export interface TaskPatchInput {
  id: number;
  problem_name?: string;
  name?: string;
  memo?: string;
  status?: Status;
}

export interface TaskConfigPatchInput {
  task_id: number;
  dt?: number;
  tau?: number;
  b0?: number;
  threads?: number;
  develop_time_method?: DevelopTimeMethod;
}
