import "express";

declare module "express-serve-static-core" {
  interface Request {
    USER_ID?: string;
  }
}