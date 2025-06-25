import { Request, Response } from "express";

import { getAllStopwatch_service } from "../services/StopwatchService";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getAllStopwatch_controller = async (
	_req: Request,
	res: Response
) => {
	try {
		const stopwatch = await getAllStopwatch_service();
		return res.status(200).json(stopwatch);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};
