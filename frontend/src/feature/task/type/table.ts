export type Status = "QUEUED" | "PREPARING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELED" | "ANALYZING";

export type TaskRowUser = {
  name: string;
  studentId: string;
};

export type TaskRow = {
  id: number;
  user: TaskRowUser;
  createdAt: Date;
  status: Status;
  ratio: number;
  problemName: string;
  name: string;
  memo: string;
};

export type TableData = {
  tasks: TaskRow[];
  totalTasks: number;
};

export type OrderType = "DESC" | "ASC";

export type TaskRequest = {
  elemStart: number;
  elemEnd: number;
  order: OrderType;
  user: string | null;
  problemName: string | null;
  dateStart: Date | null;
  dateEnd: Date | null;
  status: Status | null;
};
