import { Request, Response } from "express";
import { getBills_service } from "../services/BillService";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getBills_controller = async (_req: Request, res: Response) => {
	try {
		const bills = await getBills_service();
		return res.status(200).json(bills);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};
