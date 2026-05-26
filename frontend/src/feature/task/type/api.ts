import type { Status } from "./table";

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
