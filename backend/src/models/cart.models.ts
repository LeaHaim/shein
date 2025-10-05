import mongoose, { Schema } from "mongoose";
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
const CartScheme = new Schema<ICart>(
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
