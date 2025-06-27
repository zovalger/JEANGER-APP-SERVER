import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";
import {
	PaginationValidator,
	validateResult,
} from "../../../common/common.module";
import { UserPermissions } from "../enum";

export const CreateUserValidator = [
	body("email").exists().isString().trim().isEmail(),
	body("password").exists().isString().trim().notEmpty().isLength({ min: 8 }),
	body("permissions").exists().isArray(),
	body("permissions.*")
		.isString()
		.trim()
		.notEmpty()
		.isIn(Object.values(UserPermissions)),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const UpdateUserValidator = [
	body("email").optional().isString().trim().isEmail(),
	body("password").optional().isString().trim().notEmpty().isLength({ min: 8 }),
	body("permissions").optional().isArray(),
	body("permissions.*")
		.isString()
		.trim()
		.notEmpty()
		.isIn(Object.values(UserPermissions)),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QueryUserValidator = [
	...PaginationValidator,
	query("email").optional().isString().trim().isEmail(),
	query("permissions").optional().isArray(),
	query("permissions.*")
		.isString()
		.trim()
		.notEmpty()
		.isIn(Object.values(UserPermissions)),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
