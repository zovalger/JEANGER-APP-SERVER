import jwt from "jsonwebtoken";
import Messages from "../../common/classes/Messages";
import { SECRET_WORD } from "../../config";
import { BadRequestException } from "../../common/classes/ErrorWithHttpStatus";
import { IUser } from "../interfaces/user.interface";

const userByJWT = (token: string) => {
	try {
		const decoded = jwt.verify(token, SECRET_WORD);

		return decoded as Pick<IUser, "_id">;
	} catch (error) {
		throw new BadRequestException(Messages.error.invalidCredentials());
	}
};

export default userByJWT;
