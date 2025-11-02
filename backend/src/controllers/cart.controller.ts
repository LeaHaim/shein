import mongoose from "mongoose";
import { AppError } from "../classes/AppError.class";
import { STATUS } from "../enums/status.enum";
import { CartServiceInstance } from "../services/cart.services";
import { AppResponse } from "../utils/AppResponse.utils";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  try {
    const cart = await CartServiceInstance.getAll(req.USER_ID!);
    return AppResponse(res, cart, STATUS.OK);
  } catch (error) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

export async function addItemToCart(req: Request, res: Response) {
  try {
    const { user_id, item_id, quantity } = req.body;
    const cart = await CartServiceInstance.addItemToCart(
      user_id,
      item_id,
      quantity
    );
    return AppResponse(res, cart, STATUS.OK);
  } catch (error) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

export async function deleteItem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("No such item", STATUS.NOT_FOUND);
    }
    const cart = CartServiceInstance.deleteItem(req.USER_ID!, id);
    return AppResponse(res, cart, STATUS.OK);
  } catch (error) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
