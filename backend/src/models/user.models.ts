import mongoose, { Document, Schema } from "mongoose";
import { IUser, USER_ROLE } from "../types/user.types";

export interface IUserScheme extends Document,IUser {}
const UserScheme = new Schema<IUserScheme>(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      minLength: 2,
      unique:true,
    },
    password: {
      type: String,
      required: true,
      minLength: 2,
    },
    role: {
      type:String,
      enum: USER_ROLE,
      default: USER_ROLE.USER,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserScheme);
