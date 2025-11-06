import { useUserContext } from "@/contexts/UserContext";
import axios from "axios";
import {
  USER_ADD_ITEM_TO_FAVORITE,
  USER_DELETE_ITEM_FROM_FAVORITE,
  USER_GET_ALL_FAVORITE,
} from "./setting";
import type { IFavorite } from "@/types/favorite.types";

export function useFavorite() {
  const { data } = useUserContext();
  async function getAllItems(): Promise<IFavorite[] | null> {
    return axios
      .get(USER_GET_ALL_FAVORITE, {
        headers: {
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function addItemToFavorite(item: IFavorite) {
    item.user_id = data.user?._id;
    return axios
      .post(USER_ADD_ITEM_TO_FAVORITE, item, {
        headers: {
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
  async function deleteItemFromFavorite(item_id: string){
    return axios
      .delete(USER_DELETE_ITEM_FROM_FAVORITE+item_id, {
        headers: {
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  return { getAllItems, addItemToFavorite,deleteItemFromFavorite };
}
