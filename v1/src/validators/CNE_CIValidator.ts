import { NextFunction, Request, Response } from "express";

import { query } from "express-validator";
import validateResult from "../helpers/validateHelper";

// ************************************************************************
// 									validacion al consultar cedula
// ************************************************************************

const CNE_CIValidator = [
	query("ci")
		.exists()
		.isString()
		.trim()
		.customSanitizer((value: string) => {
			if (!value) return "";

			const newValue = value.replace(/\D/g, "");

			console.log("anterior", value, "nuevo", newValue);

			return newValue;
		}),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export default CNE_CIValidator;
