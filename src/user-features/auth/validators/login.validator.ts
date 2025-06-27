import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { validateResult } from "../../../common/common.module";

export const UserLoginValidator = [
	body("email").exists().isString().trim().isEmail(),
	body("password").exists().isString().trim().notEmpty().isLength({ min: 8 }),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
