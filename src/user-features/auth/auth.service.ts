import jwt from "jsonwebtoken";
import { config, HttpErrors, Messages } from "../../common/common.module";
import { UserModule } from "../user-features.module";
import { ISessionTokenFromDBDto, LoginDto } from "./dto";
import { SessionTokenModel } from "./models";

export const verifyCredentials_service = async (
	loginDto: LoginDto
): Promise<ISessionTokenFromDBDto> => {
	const { email, password } = loginDto;

	const user = await UserModule.UserService.get_User_by_email_service(email);

	if (!user)
		throw new HttpErrors.NotFoundException(Messages.error.invalidCredentials());

	if (user.email != config.ADMIN_EMAIL) {
		const matchPassword = await (
			user as UserModule.dto.UserFromDBDto
		).comparePassword(password);

		if (!matchPassword)
			throw new HttpErrors.BadRequestException(
				Messages.error.invalidCredentials()
			);
	} else if (password != config.ADMIN_PASSWORD) {
		// todo: enviar correo de notificacion de inicio de sesion de usuario root
		throw new HttpErrors.BadRequestException(
			Messages.error.invalidCredentials()
		);
	}
	const token = jwt.sign({ _id: user._id }, config.SECRET_WORD, {
		expiresIn: 86400, // 24 hours
	});

	const session = await new SessionTokenModel({ token }).save();

	return session;
};

export const findToken_service = async (
	token: string
): Promise<ISessionTokenFromDBDto> => {
	const sesionToken = await SessionTokenModel.findOne({ token });

	if (!sesionToken)
		throw new HttpErrors.BadRequestException(
			Messages.error.invalidCredentials()
		);

	return sesionToken;
};
