import { useUserContext } from "@/contexts/UserContext";
import axios from "axios";
import {
  ADMIM_DELETE_ONE_ITEM_URL,
  USER_ADD_ITEM_TO_CART,
  USER_DELETE_ITEM_FROM_CART,
  USER_GET_ALL_ITEMS_IN_CART,
} from "./setting";
import type { ICart } from "@/types/cart.types";
import type { IItem } from "@/types/item.types";

export function useCart() {
  const { data } = useUserContext();
  async function getAllItems(): Promise<ICart[] | null> {
    return axios
      .get(USER_GET_ALL_ITEMS_IN_CART, {
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
  async function addItemToCart(item: ICart) {
    item.user_id = data.user?._id;
    return axios
      .post(USER_ADD_ITEM_TO_CART, item, {
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
  async function deleteItemFromCart(item_id: string){
    return axios
      .delete(USER_DELETE_ITEM_FROM_CART+item_id, {
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
  async function getOneItem(id: string): Promise<IItem | null> {
    return axios
      .get(ADMIM_DELETE_ONE_ITEM_URL + id, {
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
  return { getAllItems, addItemToCart, getOneItem,deleteItemFromCart };
}
