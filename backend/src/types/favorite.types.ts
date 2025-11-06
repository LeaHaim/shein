export interface IFavorite {
  user_id: string;
  items: IItemInFavorite[];
}

export interface IItemInFavorite {
  item_id: string;
}