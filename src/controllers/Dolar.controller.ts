import { Request, Response } from "express";

import { getLastDolar_service } from "../services/DolarService";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getDolar_controller = async (_req: Request, res: Response) => {
	try {
		const Dolar = await getLastDolar_service();

		return res.status(200).json(Dolar);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};
