import { STATUS } from "../enums/status.enum";

export class AppError {
  message: string;
  status: STATUS;
  constructor(message: string,status:STATUS=400) {
    this.message = message;
    this.status = status;
  }
}
