import { IUserScheme, UserModel } from "../models/user.models";
import bcrypt from "bcrypt";
import { AppError } from "../classes/AppError.class";
import jwt from "jsonwebtoken";
import { Experation } from "../enums/experation.enum";

class UserService {
  async isExist(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }
  async login(email: string, password: string): Promise<IUserScheme> {
    const user = await this.isExist(email);
    if (!user) throw new AppError("User was not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Invalid Credentials");
    return user;
  }
  generateUserToken(_id: string) {
    if (!process.env.SECRET) {
      throw new AppError("SECRET environment variable is not set");
    }
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: Experation.DAY });
  }
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<IUserScheme> {
    const hashedPassword = await this.hashPassword(password);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}

export const UserServiceInstance = new UserService();
