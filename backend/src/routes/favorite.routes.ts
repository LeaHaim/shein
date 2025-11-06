import { Router } from "express";

import { protectRoute } from "../middlewares/requireAuth.middleware";
import { USER_ROLE } from "../types/user.types";
import {
  addItemToFavorite,
  deleteItem,
  getAll,
} from "../controllers/favorite.controller";

export const favoriteRouter = Router();

favoriteRouter.use(protectRoute([USER_ROLE.USER]));
favoriteRouter.get("/favorite", getAll);
favoriteRouter.post("/addItem", addItemToFavorite);
favoriteRouter.delete("/:id", deleteItem);
