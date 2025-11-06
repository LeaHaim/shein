import mongoose from "mongoose";
import { FavoriteServiceInstance } from "../services/favorite.services";
import { Request, Response } from "express";
import { ItemModel } from "../models/item.models";
import { IItemInFavorite } from "../types/favorite.types";
import { IItem } from "../types/item.types";
import { AppResponse } from "../utils/AppResponse.utils";
import { STATUS } from "../enums/status.enum";
import { AppError } from "../classes/AppError.class";

interface ExtendedFavoriteItem extends IItemInFavorite {
  item?: IItem;
}
export async function getAll(req: Request, res: Response) {
  try {
    const favorite: ExtendedFavoriteItem[] =
      await FavoriteServiceInstance.getAll(req.USER_ID!);
    for (const itemInFavorite of favorite) {
      const item = await ItemModel.findById(itemInFavorite);
      if (item) {
        itemInFavorite.item = item;
      }
    }
    return AppResponse(res, favorite, STATUS.OK);
  } catch (error) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

export async function addItemToFavorite(req: Request, res: Response) {
  try {
    const { user_id, item_id, quantity } = req.body;
    const cart = await FavoriteServiceInstance.addItemToFavorite(
      user_id,
      item_id
    );
    return AppResponse(res, cart, STATUS.CREATED);
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
    const cart = FavoriteServiceInstance.deleteItemFromFavorite(
      req.USER_ID!,
      id
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
