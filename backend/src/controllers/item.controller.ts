import { Request, Response } from "express";
import { AppError } from "../classes/AppError.class";
import { STATUS } from "../enums/status.enum";
import { AppResponse } from "../utils/AppResponse.utils";
import { ItemServiceInstance } from "../services/item.services";
import { IItem } from "../types/item.types";
import mongoose from "mongoose";
export async function getAll(req: Request, res: Response) {
  try {
    const users = await ItemServiceInstance.getAll();
    return AppResponse(res, users, STATUS.OK);
  } catch (error) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
export async function getOneItem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("No such item", STATUS.NOT_FOUND);
    }
    const item = await ItemServiceInstance.findOneItem(id);
    return AppResponse(res, item, STATUS.OK);
  } catch (error) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
export async function addItem(req: Request, res: Response) {
  try {
    const { category, name, description, price, image } = req.body as IItem;
    if (!category || !name || !description || !price || !image)
      throw new AppError("All fields must be filled");
    const item = await ItemServiceInstance.addItem(
      category,
      name,
      description,
      price,
      image
    );
    return AppResponse(res, item, STATUS.OK);
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
    const item = await ItemServiceInstance.deleteItem(id);
    return AppResponse(res, item, STATUS.OK);
  } catch (error) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
export async function updateItem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("No such item", STATUS.NOT_FOUND);
    }
    const item = await ItemServiceInstance.updateItem(id, req.body);
    return AppResponse(res, item, STATUS.OK);
  } catch (error) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
