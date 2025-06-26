import { Request } from "express";
import { UserAttributes } from "./src/auth/models/user.model";

declare module "express" {
	interface Request {
		user?: UserLoggedAttributes;
	}
}
