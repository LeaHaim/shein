import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../classes/AppError.class";
import { STATUS } from "../enums/status.enum";

export async function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError("Token was not provided", STATUS.BAD_REQUEST);
    }
    const { _id } = jwt.verify(token, process.env.SECRET || "") as JwtPayload;
    req.USER_ID = _id
    next();
  } catch (error) {
    console.log(error);
  }
}
