import type { ILogin } from "@/types/auth.types";
import { useState } from "react";
import axios from "axios";
import { AUTH_LOGIN_URL } from "./setting";
import { useUserContext } from "@/contexts/UserContext";

export function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const { login } = useUserContext();
  async function loginFunction(data: ILogin) {
    axios
      .post(AUTH_LOGIN_URL, data)
      .then((res) => {
        setError(null);
        login(res.data.user, res.data.token);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }
  return { loginFunction, error };
}
