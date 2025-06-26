import { UserPermissions } from "../enum/user-permissions.enum";

export interface IUser {
	_id: string;
	email: string;
	password: string;
	permissions: UserPermissions[];
	createdAt: Date;
	updatedAt: Date;
}
