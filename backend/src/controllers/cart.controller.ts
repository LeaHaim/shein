import { AppError } from "../classes/AppError.class";
import { STATUS } from "../enums/status.enum";
import { CartServiceInstance } from "../services/cart.services";
import { AppResponse } from "../utils/AppResponse.utils";

export async function getAll(req: Request, res: Response) {

  try {
    const users = await CartServiceInstance.getAll(req.USER_ID);
    return AppResponse(res, users, STATUS.OK);
  } catch (error) {
    return AppResponse(
      res,
      error,
      error instanceof AppError ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
