import { Response } from "express";
import { STATUS } from "../enums/status.enum";

export function AppResponse(res:Response,data:any=null,status:STATUS){
   return res.status(status).json(data)
}