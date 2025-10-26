import { Router } from "express";
import {
  login,
  register,
  reValidateUser,
} from "../controllers/auth.controller";
import { USER_ROLE } from "../types/user.types";
import { protectRoute } from "../middlewares/requireAuth.middleware";

export const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.get("/revalidate", protectRoute([USER_ROLE.ADMIN,USER_ROLE.USER]), reValidateUser);
