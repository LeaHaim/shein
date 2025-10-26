import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../classes/AppError.class";
import { STATUS } from "../enums/status.enum";
import { USER_ROLE } from "../types/user.types";
import { AppResponse } from "../utils/AppResponse.utils";

export function protectRoute(allowedRoles: USER_ROLE[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new AppError("Token was not provided", STATUS.BAD_REQUEST);
      }
      const { _id, role } = jwt.verify(
        token,
        process.env.SECRET || ""
      ) as JwtPayload;
      if (!allowedRoles.includes(role)) {
        throw new AppError("permission denied", STATUS.FORBIDDEN);
      }
      req.USER_ID = _id;
      next();
    } catch (error) {
      return AppResponse(
        res,
        error instanceof AppError ? error.message : error,
        error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
      );
    }
  };
}
