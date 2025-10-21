import { Request, Response } from "express";
import { UserServiceInstance } from "../services/user.services";
import { AppError } from "../classes/AppError.class";
import { AppResponse } from "../utils/AppResponse.utils";
import { STATUS } from "../enums/status.enum";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new AppError("Email and password are required");
    const user = await UserServiceInstance.login(email, password);
    const token = UserServiceInstance.generateUserToken(user._id as string);
    return AppResponse(res, { token, user }, STATUS.OK);
  } catch (error: unknown) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      throw new AppError("All fields must be filled");
    const exist = await UserServiceInstance.isExist(email);
    if (exist) throw new AppError("user already exist");
    const user = await UserServiceInstance.register(name, email, password);
    const token = UserServiceInstance.generateUserToken(user._id as string);
    return AppResponse(res, { token, user }, STATUS.OK);
  } catch (error: unknown) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
export async function reValidateUser(req:Request,res:Response) {
  try {
    console.log("Revalidate function reached")
    const user = await UserServiceInstance.getUserById(req.USER_ID!)
    return AppResponse(res,user,STATUS.OK)
  } catch (error) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}