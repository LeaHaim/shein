import { AppError } from "../classes/AppError.class";
import { STATUS } from "../enums/status.enum";
import { ItemModel } from "../models/item.models";
import { IItem } from "../types/item.types";

class ItemService {
  async getAll(): Promise<IItem[]> {
    return await ItemModel.find();
  }
  async addItem(
    category: string,
    name: string,
    description: string,
    price: number,
    image: string
  ): Promise<IItem> {
    const item = ItemModel.create({
      category,
      name,
      description,
      price,
      image,
    });
    return item;
  }
  async findOneItem(id: string) {
    const item = await ItemModel.findById({ _id: id });
    if (!item) {
      throw new AppError("No such item", STATUS.NOT_FOUND);
    }
    return item;
  }
  async deleteItem(id: string) {
    const item = await ItemModel.findByIdAndDelete({ _id: id });
    if (!item) {
      throw new AppError("No such item", STATUS.NOT_FOUND);
    }
    return item;
  }
  async updateItem(id: string, body: JSON) {
    const item = await ItemModel.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    if (!item) {
      throw new AppError("No such item", STATUS.NOT_FOUND);
    }
    return item;
  }
}
export const ItemServiceInstance = new ItemService();
