import { CartModel } from "../models/cart.models";
import { IItemInCart } from "../types/cart.types";

class CartService {
  async getAll(id: string): Promise<IItemInCart[]> {
    return await CartModel.find({ user_id: id });
  }
  async AddItemToCart(user_id: string,item_id: string, quantity: number){
    let cart = await CartModel.findById(user_id);

    
  }
}
export const CartServiceInstance = new CartService();
