import { Request, Response } from "express";

import {
	createForeignExchange_service,
	getLastForeignExchange_service,
} from "../services/ForeignExchangeService";
import { ForeignExchange } from "../types";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const setForeignExchange_controller = async (
	req: Request,
	res: Response
) => {
	const data: ForeignExchange = req.body;

	try {
		const Dolar = await createForeignExchange_service(data);

		return res.status(200).json(Dolar);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getForeignExchange_controller = async (
	_req: Request,
	res: Response
) => {
	try {
		const Dolar = await getLastForeignExchange_service();

		return res.status(200).json(Dolar);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};
