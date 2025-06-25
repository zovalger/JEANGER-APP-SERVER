import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV;

export const SECRET_WORD = process.env.SECRET_WORD;

export const MONGODB_URI =
	process.env.MONGODB_URI ||
	process.env.MONGODB_URI_TEST ||
	"mongodb://127.0.0.1/test";
