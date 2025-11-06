import type { IItem } from "./item.types";

export interface IFavorite {
  user_id?: string;
  item_id: string;
  item?: IItem;
}
