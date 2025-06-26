import { IUser } from "../interfaces/user.interface";

export interface CreateUserDto
	extends Omit<IUser, "_id" | "createdAt" | "updatedAt"> {}
