import { Request, Response } from "express";

import {
	createUser_service,
	// deleteUser_service,
	// get_User_by_email_service,
	get_User_service,
	get_Users_service,
	get_profile_User_service,
	updateUser_service,
	verifyCredentials_service,
} from "./user.service";

import { errorHandlerHelper } from "../../common/helpers/errorHandler.helper";
import { BadRequestException } from "../../common/classes/ErrorWithHttpStatus";
import { matchedData } from "express-validator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import Messages from "../../common/classes/Messages";
import { LoginDto } from "../auth/dto/login.dto";

export const createUser_controller = async (req: Request, res: Response) => {
	try {
		const createUserDto = matchedData(req) as CreateUserDto;

		const user = await createUser_service(createUserDto);

		// await createSystemLog_service({
		// 	systemAction: SystemAction.create,
		// 	moduleItem: moduleItems.user,
		// 	itemId: user._id.toString(),
		// 	text: user.email,
		// 	userId: req.user._id,
		// 	userEmail: req.user.email,
		// });

		res.status(200).json({ data: user });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getUser_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const user = await get_User_service(id);

		res.status(200).json({ data: user });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getUsers_controller = async (_req: Request, res: Response) => {
	try {
		const user = await get_Users_service();

		res.status(200).json({ data: user });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const profile_controller = async (req: Request, res: Response) => {
	try {
		const { user: sesionUser } = req;

		if (!sesionUser) throw new BadRequestException(Messages.error.notToken());

		const user = await get_profile_User_service(sesionUser._id);

		res.status(200).json({ data: user });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateUser_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updateUserDto = matchedData(req) as UpdateUserDto;

		const user = await updateUser_service(id, updateUserDto);

		// await createSystemLog_service({
		// 	systemAction: SystemAction.update,
		// 	moduleItem: moduleItems.user,
		// 	itemId: user._id.toString(),
		// 	text: user.email,
		// 	userId: req.user._id,
		// 	userEmail: req.user.email,
		// });

		res.status(200).json({ data: user });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteUser_controller = async (_req: Request, res: Response) => {
	try {
		// const { id } = req.params;

		// const user = await deleteUser_service(id);

		// await createSystemLog_service({
		// 	systemAction: SystemAction.delete,
		// 	moduleItem: moduleItems.user,
		// 	itemId: user._id.toString(),
		// 	text: user.email,
		// 	userId: req.user._id,
		// 	userEmail: req.user.email,
		// });

		res.status(200).json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
