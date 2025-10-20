import { Response } from "express";
import { STATUS } from "../enums/status.enum";

export function AppResponse(res:Response,data:any=null,status:STATUS=400){
   return res.status(status).json(data)
}