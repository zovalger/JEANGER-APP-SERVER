import express from "express";

import {
	createUser_controller,
	deleteUser_controller,
	getUser_controller,
	getUsers_controller,
	profile_controller,
	signin_user_controller,
	updateUser_controller,
} from "./user.controller";

const UserRouter = express.Router();

UserRouter.post("/signin", UserLoginValidator, signin_user_controller);
UserRouter.get("/profile", verifyToken, profile_controller);

UserRouter.get("/", verifyToken, getUsers_controller);
UserRouter.post(
	"/",
	verifyToken,
	hasPermission(UserPermissions.simple),
	CreateUserValidator,
	createUser_controller
);

UserRouter.get("/:id", verifyToken, getUser_controller);
UserRouter.put("/:id", verifyToken, UpdateUserValidator, updateUser_controller);
UserRouter.delete("/:id", verifyToken, deleteUser_controller);

export { UserRouter };
