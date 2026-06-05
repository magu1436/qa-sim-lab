import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskApi from "../api/task";
import useCreateTaskDialogContext from "@/feature/home/hook/useCreateTaskDialogContext";
import type { TaskPostRequest } from "../type/api";
import type { Task } from "../type/task";

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

export const useGetTask = (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setTask: React.Dispatch<React.SetStateAction<Task | undefined>>) => {
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      setIsLoading(true);
      const res = await TaskApi.get(id);
      setIsLoading(false);
      return res;
    },
    onSuccess: (data) => {
      const task: Task = {
        id: data.id,
        name: data.name || undefined,
        problemName: data.problem_name,
        memo: data.memo || undefined,
        config: {
          dt: data.config.dt,
          tau: data.config.tau,
          b0: data.config.b0,
          threads: data.config.threads,
          developTimeMethod: data.config.develop_time_method,
          inputFile: data.config.input_file || undefined,
        }
      }
      setTask(task);
    }
  })
  return mutation;
}