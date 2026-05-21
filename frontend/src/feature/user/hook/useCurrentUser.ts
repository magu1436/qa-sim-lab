import { useQuery } from "@tanstack/react-query";
import UserMeApi from "../api/user";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: UserMeApi.get,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useCurrentUser;