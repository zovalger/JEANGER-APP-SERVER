import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";
export const CreateUserValidator = [
	body("email").exists().isString().trim().isEmail(),
	body("password").exists().isString().trim().notEmpty().isLength({ min: 8 }),
	body("employeeId").exists().isString().trim().notEmpty().isMongoId(),
	body("permissions").isArray(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const UpdateUserValidator = [
	body("email").optional().isString().trim().isEmail(),
	body("password").optional().isString().trim().notEmpty().isLength({ min: 8 }),
	body("employeeId").optional().isString().trim().notEmpty().isMongoId(),
	body("permissions").optional().isArray(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QueryUserValidator = [
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
