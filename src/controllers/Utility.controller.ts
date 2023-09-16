import { Request, Response } from "express";
import CNE_CI from "../utils/CNE_CI";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getCNE_CI_controller = async (req: Request, res: Response) => {
	const { ci: clientCI } = req.query;

	if (!clientCI) return res.status(500).json({ error: true, message: "" });

	try {
		const ci = await CNE_CI(clientCI.toString());
		return res.status(200).json(ci);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};
