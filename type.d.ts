import { Request } from "express";
import { UserAttributes } from "./src/user-features/user/models/user.model";

declare module "express" {
	interface Request {
		user?: UserLoggedAttributes;
	}
}
