import { Request, Response } from "express";

import {
	getProductSettings_service,
	updateProductSettings_service,
} from "../services/ProductSettingsService";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getProductSettings_controller = async (
	_req: Request,
	res: Response
) => {
	try {
		const productSettings = await getProductSettings_service();

		return res.status(200).json(productSettings);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};

export const updateProductsSettings_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const productSettings = await updateProductSettings_service(req.body);

		return res.status(200).json(productSettings);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};
