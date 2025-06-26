import { config } from "dotenv";
import { UserLoggedDto } from "../auth/dto/user-logged.dto";
import { UserPermissions } from "../auth/enum/user-permissions.enum";

config();

export const PORT = process.env.PORT || 5000;

export const NODE_ENV = process.env.NODE_ENV || "dev";

export const SECRET_WORD = process.env.SECRET_WORD || "";

export const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://127.0.0.1/test";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "null";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const adminUserObject: UserLoggedDto = {
	_id: "00000000000000000000000",
	email: ADMIN_EMAIL,
	permissions: Object.values(UserPermissions),
};
