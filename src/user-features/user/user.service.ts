import jwt from "jsonwebtoken";

import {
	BadRequestException,
	NotFoundException,
} from "../../common/classes/ErrorWithHttpStatus";
import {
	ADMIN_EMAIL,
	ADMIN_PASSWORD,
	SECRET_WORD,
	adminUserObject,
} from "../../common/config";
import { LoginDto } from "../auth/dto/login.dto";
import userModel from "./models/user.model";
import sesionTokenModel from "./models/sesion-token.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import Messages, { ModuleItems } from "../../common/classes/Messages";
import { UserFromDBDto } from "./dto/user-from-db.dto";
import { UserLoggedDto } from "../auth/dto/user-logged.dto";

// ****************************************************************************
// 										             creacion
// ****************************************************************************

export const createUser_service = async (data: CreateUserDto) => {
	const { email } = data;

	let oldUser = null;
	try {
		oldUser = await get_User_by_email_service(email);
	} catch (error) {
		console.log(error);
	}

	if (oldUser)
		throw new BadRequestException(
			Messages.error.alreadyExist(ModuleItems.user)
		);

	const user = new userModel(data);

	await user.save();

	user.password = "";

	return user;
};

// ****************************************************************************
// 										             getters
// ****************************************************************************

export const get_Users_service = async (): Promise<UserFromDBDto[]> => {
	const user = await userModel.find({}, { password: 0 }).sort("email");

	return user;
};

export const get_User_service = async (
	id: string
): Promise<UserFromDBDto | UserLoggedDto> => {
	const user =
		id == adminUserObject._id
			? adminUserObject
			: await userModel.findById(id, { password: 0 });

	if (!user) throw new Error(Messages.error.notFound(ModuleItems.user));

	return user;
};

export const get_User_by_email_service = async (
	email: string
): Promise<UserFromDBDto | UserLoggedDto> => {
	const user =
		email == ADMIN_EMAIL ? adminUserObject : await userModel.findOne({ email });

	if (!user)
		throw new NotFoundException(Messages.error.notFound(ModuleItems.user));

	return user;
};

export const get_profile_User_service = async (
	id: string
): Promise<UserLoggedDto> => {
	let adminUser = id == adminUserObject._id ? adminUserObject : null;
	let dbUser = null;

	if (!adminUser) {
		const a = await userModel.findById(id);

		if (!a)
			throw new NotFoundException(Messages.error.notFound(ModuleItems.user));

		dbUser = a.toJSON();

		delete (dbUser as { password?: string }).password;
	}

	const user = adminUser || dbUser;

	if (!user)
		throw new NotFoundException(Messages.error.notFound(ModuleItems.user));

	return user as unknown as UserLoggedDto;
};

// ****************************************************************************
// 										             update
// ****************************************************************************

export const updateUser_service = async (
	id: string,
	data: UpdateUserDto
): Promise<UserFromDBDto> => {
	const { email } = data;

	// verificar que el email no exista en otro usuario
	if (email) {
		const oldUser = await get_User_by_email_service(email);

		if (oldUser._id != id)
			throw new BadRequestException(
				Messages.error.alreadyExist(ModuleItems.user)
			);
	}

	const user = await userModel.findByIdAndUpdate(id, data, { new: true });

	if (!user)
		throw new BadRequestException(Messages.error.notFound(ModuleItems.user));

	return user;
};

export const deleteUser_service = async (id: string) => {
	return await userModel.findByIdAndDelete(id);
};
