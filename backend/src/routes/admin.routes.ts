import { Router } from "express";
import {
  addItem,
  deleteItem,
  getAll,
  getOneItem,
  updateItem,
} from "../controllers/item.controller";

export const adminRouter = Router();

adminRouter.get("/getall", getAll);
adminRouter.post("/additem", addItem);
adminRouter.delete("/:id", deleteItem);
adminRouter.get("/:id", getOneItem);
adminRouter.patch("/:id", updateItem);
