import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.routes";
import { initilizeDatabase } from "./utils/initilizeDB";
import cors from "cors";
import { adminRouter } from "./routes/admin.routes";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
try {
  mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => {
      initilizeDatabase();
      app.listen(process.env.PORT, () => {
        console.log("Welcome to the Shein 🛍️");
      });
    })
    .catch((err) => {
      console.log(err);
    });
} catch (error) {
  console.log(error);
}
