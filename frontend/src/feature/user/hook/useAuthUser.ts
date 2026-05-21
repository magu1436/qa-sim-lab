import { useContext } from "react";
import { AuthUserContext } from "@/feature/home/component/AuthUserContext";


const useAuthUser = () => {
  const val = useContext(AuthUserContext);
  if (val === null) {
    throw new Error("useAuthUser must be used within a AuthUserProvider");
  }
  return val;
};

export default useAuthUser;