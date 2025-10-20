import { NextFunction, Request, Response } from "express";
import { AppResponse } from "../utils/AppResponse.utils";
import { STATUS } from "../enums/status.enum";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../classes/AppError.class";

interface IJWTPayload extends JwtPayload {
  _id: string;
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    console.log(error);
    return AppResponse(
      res,
      { message: "Invalidate Token" },
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
