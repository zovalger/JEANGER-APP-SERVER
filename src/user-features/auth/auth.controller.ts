import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { LoginDto } from "./dto";
import { verifyCredentials_service } from "./auth.service";
import { errorHandlerHelper } from "../../common/common.module";

export const signin_user_controller = async (req: Request, res: Response) => {
	const loginDto = matchedData(req) as LoginDto;

	try {
		// const user = await get_User_by_email_service(email);

		const token = await verifyCredentials_service(loginDto);

		// await createSystemLog_service({
		// 	systemAction: SystemAction.login,
		// 	moduleItem: moduleItems.user,
		// 	// itemId: user._id,
		// 	// text: user.email,
		// 	userId: user._id.toString(),
		// 	userEmail: email,
		// });

		res.status(200).json({ token });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
