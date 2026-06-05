import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskApi from "../api/task";
import useCreateTaskDialogContext from "@/feature/home/hook/useCreateTaskDialogContext";
import type { TaskPostRequest } from "../type/api";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { setIsLoading } = useCreateTaskDialogContext();
  const mutation = useMutation({
    mutationFn: async (request: TaskPostRequest) => {
      setIsLoading(true);
      const res = await TaskApi.post(request);
      setIsLoading(false);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return mutation;
};
