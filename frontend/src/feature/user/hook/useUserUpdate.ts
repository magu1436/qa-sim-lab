import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserMePatchApi } from "../type/api";
import UserMeApi from "../api/user";

const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: UserMePatchApi) => UserMeApi.patch(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  return mutation;
};

export default useUserUpdate;
