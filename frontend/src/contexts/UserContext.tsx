import { AUTH_REVALIDATE_URL } from "@/hooks/setting";
import type { IUser } from "@/types/user.types";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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
  useEffect(() => {
    const myToken = localStorage.getItem("token");
    if (myToken) {
      setData((prev) => ({ ...prev, token: myToken }));
    }
  }, []);
  useEffect(() => {
    if (data.token) {
      axios
        .get(AUTH_REVALIDATE_URL, {
          headers: {
            Authorization: "Bearer " +data.token,
          },
        })
        .then((res) => {
           setData(prev=>({...prev,user:res.data}))
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data.token]);

  function login(user: IUser, token: string) {
    localStorage.setItem("token", token);
    setData({
      token,
      user,
    });
  }
  function logout() {
    localStorage.removeItem("token");
    setData({
      user: null,
      token: null,
    });
  }
  return (
    <UserContext.Provider
      value={{ data: { user: data.user, token: data.token }, login, logout }}
    >
      {data.token}
      {JSON.stringify(data.user)}
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const data = useContext(UserContext);
  return data;
}
