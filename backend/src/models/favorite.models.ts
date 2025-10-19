import mongoose, { Schema, Document } from "mongoose";

interface IFavoriteSchema extends IFavorite, Document {}

const FavoriteScheme = new Schema<IFavoriteSchema>(
  {
    user_id: {
      type: String,
      required: true,
    },
    items: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const FavoriteModel = mongoose.model("favorite", FavoriteScheme);
