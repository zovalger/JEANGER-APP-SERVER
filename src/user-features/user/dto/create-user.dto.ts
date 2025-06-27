import { IUser } from "../interfaces";

export interface CreateUserDto
	extends Omit<IUser, "_id" | "createdAt" | "updatedAt"> {}
