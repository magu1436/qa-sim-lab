import { useMutation, useQueryClient } from "@tanstack/react-query";
import logout from "../api/logout";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      await queryClient.setQueryData(["currentUser"], null);
    }
  });
  return mutation;
};

export default useLogoutMutation;
