import useCurrentTasks from "@/feature/task/hook/useCurrentTasks";
import useTaskRequest from "@/feature/task/hook/useTaskRequest";
import type { TaskRow } from "@/feature/task/type/table";
import { createContext } from "react";

type TableTaskContextValue = {
  tasks: TaskRow[];
  totalTasks: number;
  isLoading: boolean;
};

export const TableTaskContext = createContext<TableTaskContextValue | null>(null);

export const TableTaskProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const { taskRequest } = useTaskRequest();
  const { data, isLoading } = useCurrentTasks(taskRequest);

  return (
    <TableTaskContext
      value={{
        tasks: data?.tasks ?? [],
        totalTasks: data?.totalTasks ?? 0,
        isLoading: isLoading,
      }}
    >
      {children}
    </TableTaskContext>
  );
};
