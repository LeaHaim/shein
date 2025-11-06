const BASE_URL = "http://localhost:5000/api/v1";

export const AUTH_LOGIN_URL = BASE_URL + "/auth/login";
export const AUTH_REGISTER_URL = BASE_URL + "/auth/register";
export const AUTH_REVALIDATE_URL = BASE_URL + "/auth/revalidate";
export const ADMIN_GET_ALL_ITEM_URL = BASE_URL + "/admin/items";
export const ADMIM_DELETE_ONE_ITEM_URL = BASE_URL + "/admin/";
export const ADMIN_ADD_ITEM_URL = BASE_URL + "/admin/additem";
export const USER_GET_ALL_ITEMS_IN_CART = BASE_URL + "/user/cart";
export const USER_ADD_ITEM_TO_CART = BASE_URL + "/user/addItem";
export const USER_DELETE_ITEM_FROM_CART = BASE_URL + "/user/";
export const USER_GET_ALL_FAVORITE = BASE_URL + "/userFavorite/favorite";
export const USER_ADD_ITEM_TO_FAVORITE = BASE_URL + "/userFavorite/addItem";
export const USER_DELETE_ITEM_FROM_FAVORITE = BASE_URL + "/userFavorite/";
