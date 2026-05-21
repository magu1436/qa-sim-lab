import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SignUpApi } from "../type/api";
import signUp from "../api/signup";

const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: SignUpApi) => signUp(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  return mutation;
};

export default useSignUpMutation;
