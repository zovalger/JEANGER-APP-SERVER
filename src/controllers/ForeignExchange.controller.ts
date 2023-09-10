import { Request, Response } from "express";

import { getLastForeignExchange_service } from "../services/ForeignExchangeService";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getForeignExchange_controller = async (_req: Request, res: Response) => {
	try {
		const Dolar = await getLastForeignExchange_service();

		return res.status(200).json(Dolar);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};
