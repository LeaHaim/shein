import { Router } from "express";
import {
  addItem,
  deleteItem,
  getAll,
  getOneItem,
  updateItem,
} from "../controllers/item.controller";
import { protectRoute } from "../middlewares/requireAuth.middleware";
import { USER_ROLE } from "../types/user.types";

export const adminRouter = Router();

adminRouter.get("/items", getAll);
adminRouter.get("/:id", getOneItem);

adminRouter.use(protectRoute([USER_ROLE.ADMIN, USER_ROLE.USER]));
adminRouter.post("/additem", addItem);
adminRouter.delete("/:id", deleteItem);
adminRouter.patch("/:id", updateItem);
