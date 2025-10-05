import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
try {
  mongoose
    .connect(process.env.MONGO_URI||"")
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log("Welcome to the Shein 🛍️");
      });
    })
    .catch((err) => {
      console.log(err);
    });
} catch (error) {
  console.log(error)
}
