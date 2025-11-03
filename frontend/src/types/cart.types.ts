import type { IItem } from "./item.types";

export interface ICart {
  _id?: string;
  item_id: string;
  quantity: string;
  item?: IItem;
}
