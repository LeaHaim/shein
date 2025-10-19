import { UserModel } from "../models/user.models";
import { UserServiceInstance } from "../services/user.services";
import { USER_ROLE } from "../types/user.types";

export async function initilizeDatabase() {
  try {
    const password = "123456";
    const name = "Lea";
    const email = "lea@gmail.com";
    const users = await UserModel.countDocuments();
    // if (users) {
    //   console.log("Database already initilized");
    //   return;
    // }
    const hashedPassword = await UserServiceInstance.hashPassword(password);
    await UserModel.create({
      name,
      password: hashedPassword,
      email,
      role: USER_ROLE.ADMIN,
    });
  } catch (error) {}
}
