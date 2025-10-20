import { Router } from "express";
import {
  login,
  register,
  reValidateUser,
} from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/requireAuth.middleware";

export const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.get("/revalidate", requireAuth, reValidateUser);
