import type { IUser } from "@/types/user.types";
import { createContext, useContext, useState, type ReactNode } from "react";

interface IUserAndToken {
  user: IUser | null;
  token: string | null;
}
interface ContextData {
  data: IUserAndToken;
  login: (user: IUser, token: string) => void;
  logout: () => void;
}

export const UserContext = createContext<ContextData>({
  data: {
    user: null,
    token: null,
  },
  login: () => {},
  logout: () => {},
});

interface IChildren {
  children: ReactNode;
}
export function UserContextWrapper({ children }: IChildren) {
  const [data, setData] = useState<IUserAndToken>({
    user: null,
    token: null,
  });

  function login(user: IUser, token: string) {
    setData({
      token,
      user,
    });
  }
  function logout() {
    setData({
      user: null,
      token: null,
    });
  }
  return (
    <UserContext.Provider
      value={{ data: { user: data.user, token: data.token }, login, logout }}
    >
      {JSON.stringify(data)}
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const data = useContext(UserContext);
  return data;
}
