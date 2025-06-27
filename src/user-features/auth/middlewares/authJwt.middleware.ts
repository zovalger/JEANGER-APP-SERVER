import { NextFunction, Request, Response } from "express";
import { findToken_service } from "../auth.service";
import {
	errorHandlerHelper,
	HttpErrors,
	Messages,
	ModuleItems,
} from "../../../common/common.module";
import { userByJWT } from "../helpers";
import { UserModule } from "../../user-features.module";

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let tokenArr = req.headers["x-access-token"];

	const token = tokenArr instanceof Array ? tokenArr[0] : tokenArr;

	if (!token) {
		res.status(403).json({ message: "No token provided" });
		return;
	}

	try {
		const sesionToken = await findToken_service(token);

		if (!sesionToken)
			throw new HttpErrors.BadRequestException(
				Messages.error.invalidCredentials()
			);

		const { _id } = userByJWT(sesionToken.token);

		req.user = await UserModule.UserService.get_User_service(_id);

		return next();
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { user } = req;

		if (!user)
			return res
				.status(300)
				.json({ error: true, message: Messages.error.notToken() });

		const { _id } = user;

		const userFound = await UserModule.UserService.get_User_service(_id);

		if (!userFound)
			return res.status(300).json({
				error: true,
				message: Messages.error.notFound(ModuleItems.user),
			});

		return next();
	} catch (error) {
		return res.status(500).send({ error: true, message: error });
	}
};

export const hasPermission =
	(permission: UserModule.ENUMS.UserPermissions) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { user } = req;

			if (!user) {
				res.status(300).json({ error: true, message: "not user" });
				return;
			}

			const { _id } = user;

			const userFound = await UserModule.UserService.get_User_service(_id);

			if (!userFound) {
				res.status(300).json({
					error: true,
					message: Messages.error.notFound(ModuleItems.user),
				});
				return;
			}

			if (!userFound.permissions.includes(permission)) {
				res.status(300).json({
					error: true,
					message: Messages.error.withoutPermission(),
				});

				return;
			}

			if (next) next();

			return;
		} catch (error) {
			res.status(500).send({ error: true, message: error });
			return;
		}
	};
