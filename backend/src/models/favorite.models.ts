import mongoose, { Schema, Document } from "mongoose";
import { IFavorite, IItemInFavorite } from "../types/favorite.types";

interface IFavoriteSchema extends IFavorite, Document {}
const ItemInFavoriteSchema = new Schema<IItemInFavorite>(
  {
    item_id: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const FavoriteScheme = new Schema<IFavoriteSchema>(
  {
    user_id: {
      type: String,
      required: true,
    },
    items: {
      type: [ItemInFavoriteSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const FavoriteModel = mongoose.model("favorite", FavoriteScheme);
