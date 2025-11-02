import { Router } from "express";
import {
  addItemToCart,
  deleteItem,
  getAll,
} from "../controllers/cart.controller";
import { protectRoute } from "../middlewares/requireAuth.middleware";
import { USER_ROLE } from "../types/user.types";

export const cartRouter = Router();

cartRouter.use(protectRoute([USER_ROLE.USER]));
cartRouter.get("/cart", getAll);
cartRouter.post("/addItem", addItemToCart);
cartRouter.delete("/:id", deleteItem);
