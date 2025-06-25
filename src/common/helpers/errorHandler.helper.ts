import { Response } from "express";
import Messages from "../classes/Messages";

export const errorHandlerHelper = async (error: any, res: Response) => {
	console.log(error);

	if (error.status) {
		res.status(error.status).json({ error: true, message: error.message });
		return;
	}

	if (error.code === 11000) {
		res.status(400).json({ error: true, message: Messages.error.duplicate() });
		return;
	}

	res.status(500).json({ error: true, message: Messages.error.internal() });
};
