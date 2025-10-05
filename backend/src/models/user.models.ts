import mongoose, { Schema } from "mongoose";

const UserScheme = new Schema<IUser>(
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
    },
    password: {
      type: String,
      required: true,
      minLength: 2,
    },
    role: {
      enum: USER_ROLE,
      default: USER_ROLE.USER,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserScheme);
