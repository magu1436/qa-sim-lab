import { useMutation } from "@tanstack/react-query";
import type { SignUpApi } from "../type/api";
import signUp from "../api/signup";

const useSignUpMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: SignUpApi) => signUp(data),
  });
  return mutation;
};

export default useSignUpMutation;
