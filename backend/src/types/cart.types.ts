export interface ICart {
  user_id: string;
  items: IItemInCart[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IItemInCart {
  item_id: string;
  quantity: number;
}
