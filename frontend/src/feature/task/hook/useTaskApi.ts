import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskApi from "../api/task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: TaskApi.post,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return mutation;
};
