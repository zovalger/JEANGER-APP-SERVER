import { IUser } from "../interfaces/user.interface";

export interface LoginDto extends Pick<IUser, "email" | "password"> {}
