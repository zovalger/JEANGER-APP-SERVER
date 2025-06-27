import { query } from "express-validator";

export const PaginationValidator = [
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),
];
