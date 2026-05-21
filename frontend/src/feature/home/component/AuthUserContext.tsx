import useCurrentUser from "@/feature/user/hook/useCurrentUser";
import type { User } from "@/feature/user/type/user";
import { createContext } from "react";

type AuthContxtValue = {
  user: User | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
};

export const AuthUserContext = createContext<AuthContxtValue | null>(null);

export const AuthUserProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const { data, isLoading } = useCurrentUser();
  const user = data ?? null;
  return (
    <AuthUserContext
      value={{
        user: user,
        isLoggedIn: user !== null,
        isAuthLoading: isLoading,
      }}
    >
      {children}
    </AuthUserContext>
  );
};
