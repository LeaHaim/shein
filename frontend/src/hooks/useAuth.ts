import type { ILogin, IRegister } from "@/types/auth.types";
import { useState, useCallback } from "react";
import axios from "axios";
import {
  AUTH_LOGIN_URL,
  AUTH_REGISTER_URL,
  AUTH_REVALIDATE_URL,
} from "./setting";
import { useUserContext } from "@/contexts/UserContext";

export function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const { login, data } = useUserContext();
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
  async function registerFunction(data: IRegister) {
    axios
      .post(AUTH_REGISTER_URL, data)
      .then((res) => {
        setError(null);
        login(res.data.user, res.data.token);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }
  async function revalidateAuth() {
    axios
      .get(AUTH_REVALIDATE_URL, {
        headers: {
          Authorization: data.token,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return { loginFunction, registerFunction, revalidateAuth, error };
}
