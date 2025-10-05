import mongoose, { Schema } from "mongoose";

const ItemScheme = new Schema<IItem>(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    category: {
      type: String,
      required: true,
      minLength: 2,
    },
    description: {
      type: String,
      required: true,
      minLength: 2,
    },
    price: {
      type: Number,
      required: true,
      minLength: 2,
    },
    image: {
      type: String,
      required: true,
      minLength: 2,
    },
    
  },
  { timestamps: true }
);

export const ItemModel = mongoose.model("item", ItemScheme);
