import type { IItem } from "./item.types";

export interface ICart {
  user_id?: string;
  item_id: string;
  quantity: number;
  item?: IItem;
}
