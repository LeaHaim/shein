import { CartModel } from "../models/cart.models";
import { IItemInCart } from "../types/cart.types";

class CartService {
  async getAll(id: string): Promise<IItemInCart[]> {
    const cart = await CartModel.findOne({ user_id: id })
      .select("items -_id")
      .lean();
    return cart?.items || [];
  }
  async addItemToCart(user_id: string, item_id: string, quantity: number) {
    let cart = await CartModel.findOne({ user_id });
    if (!cart) {
      cart = new CartModel({ user_id, items: [{ item_id, quantity }] });
    } else {
      const item = cart.items.find((item) => item.item_id === item_id);
      if (item) {
        item.quantity += quantity;
        if (item.quantity === 0) {
          this.deleteItem(user_id, item_id);
        }
      } else {
        cart.items.push({ item_id, quantity });
      }
    }
    await cart.save();
    return await CartModel.findOne({ user_id });
  }
  async deleteItem(user_id: string, item_id: string) {
    let cart = await CartModel.findOne({ user_id });
    if (cart) {
      cart.items = cart.items.filter((i) => i.item_id != item_id);
    }
    await cart?.save();
    return await CartModel.findOne({ user_id });
  }
}
export const CartServiceInstance = new CartService();
