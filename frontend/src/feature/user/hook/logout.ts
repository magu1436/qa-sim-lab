import { useMutation } from "@tanstack/react-query";
import logout from "../api/logout";

const useLogoutMutation = () => {
  const mutation = useMutation({
    mutationFn: () => logout(),
  });
  return mutation;
};

export default useLogoutMutation;
