import { UserModule } from "../../user-features.module";

export interface LoginDto
	extends Pick<UserModule.interfaces.IUser, "email" | "password"> {}
