import { useMutation } from "@tanstack/react-query";
import type { LoginApi } from "../type/api";
import login from "../api/login";

const useLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: LoginApi) => login(data),
  });
  return mutation;
};

export default useLoginMutation;
