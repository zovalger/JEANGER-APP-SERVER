import { IUser } from "../interfaces/user.interface";

export interface UserLoggedDto
	extends Pick<IUser, "_id" | "email" | "permissions"> {}
