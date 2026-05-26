import { useQuery } from "@tanstack/react-query";
import type { TaskRequest } from "../type/table";
import order from "../api/order";

const useCurrentTasks = (request: TaskRequest) => {
  return useQuery({
    queryKey: ["tasks", request],
    queryFn: () => order(request),
  });
};

export default useCurrentTasks;
