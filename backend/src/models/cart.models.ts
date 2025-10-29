import mongoose, { Document, Schema } from "mongoose";
import { ICart, IItemInCart } from "../types/cart.types";
const ItemInCartSchema = new Schema<IItemInCart>(
  {
    item_id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

interface ICartSchema extends Document, ICart {}
const CartScheme = new Schema<ICartSchema>(
  {
    user_id: {
      type: String,
      required: true,
    },
    items: {
      type: [ItemInCartSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const CartModel = mongoose.model("cart", CartScheme);
