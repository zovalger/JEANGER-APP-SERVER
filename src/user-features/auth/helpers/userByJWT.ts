import jwt from "jsonwebtoken";
import { config, HttpErrors, Messages } from "../../../common/common.module";
import { UserModule } from "../../user-features.module";

export const userByJWT = (token: string) => {
	try {
		const decoded = jwt.verify(token, config.SECRET_WORD);

		return decoded as Pick<UserModule.interfaces.IUser, "_id">;
	} catch (error) {
		throw new HttpErrors.BadRequestException(
			Messages.error.invalidCredentials()
		);
	}
};
