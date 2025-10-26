import axios from "axios";
import { ADMIM_DELETE_ONE_ITEM_URL, ADMIN_GET_ALL_ITEM_URL } from "./setting";
import type { IItem } from "@/types/item.types";
import { useUserContext } from "@/contexts/UserContext";

export function useItem() {
  const { data } = useUserContext();
  async function getAll(): Promise<IItem[] | null> {
    return axios
      .get(ADMIN_GET_ALL_ITEM_URL)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function deleteOne(id: string) {
    return axios
      .delete(ADMIM_DELETE_ONE_ITEM_URL + id, {
        headers: {
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return { getAll, deleteOne };
}
