import { UserModule } from "../../user-features.module";

export interface UserLoggedDto
	extends Pick<UserModule.interfaces.IUser, "_id" | "email" | "permissions"> {}
