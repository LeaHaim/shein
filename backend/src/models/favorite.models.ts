import mongoose, { Schema } from "mongoose";

const FavoriteScheme = new Schema<IFavorite>(
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
