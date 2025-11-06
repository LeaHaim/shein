import { AppError } from "../classes/AppError.class";
import { STATUS } from "../enums/status.enum";
import { FavoriteModel } from "../models/favorite.models";
import { IItemInFavorite } from "../types/favorite.types";

class FavoriteService {
  async getAll(id: string): Promise<IItemInFavorite[]> {
    const favorite = await FavoriteModel.findOne({ user_id: id })
      .select("items -_id")
      .lean();
    return favorite?.items || [];
  }
  async addItemToFavorite(user_id: string, item_id: string) {
    let favorite = await FavoriteModel.findOne({ user_id });
    if (!favorite) {
      favorite = new FavoriteModel({ user_id, items: [{ item_id }] });
    } else {
      const item = favorite.items.find((item) => item.item_id === item_id);
      if (item) {
        throw new AppError(
          "item already in favorite",
          STATUS.INTERNAL_SERVER_ERROR
        );
      } else {
        favorite.items.push({ item_id });
      }
    }
    await favorite.save();
    return await FavoriteModel.findOne({ user_id });
  }
  async deleteItemFromFavorite(user_id: string, item_id: string) {
    let favorite = await FavoriteModel.findOne({ user_id });
    if (favorite) {
      favorite.items = favorite.items.filter((i) => i.item_id != item_id);
    }
    await favorite?.save();
    return await FavoriteModel.findOne({ user_id });
  }
}
export const FavoriteServiceInstance = new FavoriteService();
