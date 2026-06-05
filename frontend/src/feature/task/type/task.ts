export type DevelopTimeMethod = "NORMAL" | "WARP" | "QUADRATIC_WARP" | "AUTO";
export const ALL_DEVELOP_TIME_METHODS: readonly DevelopTimeMethod[] = [
  "NORMAL",
  "WARP",
  "QUADRATIC_WARP",
  "AUTO",
];

type InputFile = {
  id?: number;
  sizeBytes?: number;
  elementNums?: number;
  file?: File;
};

type TaskConfig = {
  id?: number;
  dt?: number;
  tau?: number;
  b0?: number;
  threads?: number;
  developTimeMethod: DevelopTimeMethod;
  inputFile?: InputFile;
};

export type Task = {
  id?: number;
  name?: string;
  problemName?: string;
  memo?: string;
  config: TaskConfig;
};

export type CreateTaskForm = {
  taskName?: string;
  problemName?: string;
  step?: number;
  dt?: number;
  tau?: number;
  b0?: number;
  threads?: number;
  developTimeMethod: DevelopTimeMethod;
  memo?: string;
  inputFile?: File;
};
