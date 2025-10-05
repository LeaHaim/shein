interface ICart {
  _id?: string;
  user_id: string;
  items: IItemInCart[];
  createdAt: Date;
  updatedAt: Date;
}

interface IItemInCart {
  item_id: string;
  quantity: number;
}
