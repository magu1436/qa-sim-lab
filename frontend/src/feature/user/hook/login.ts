import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginApi } from "../type/api";
import login from "../api/login";

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: LoginApi) => login(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  return mutation;
};

export default useLoginMutation;
