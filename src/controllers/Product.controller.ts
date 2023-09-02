import { Request, Response } from "express";
import {
	createProduct_service,
	deleteProduct_service,
	getProduct_service,
	getProducts_service,
	updateProducts_service,
} from "../services/ProductService";
import { Product } from "../types";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getProducts_controller = async (_req: Request, res: Response) => {
	try {
		const products = await getProducts_service();
		return res.status(200).json(products);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};

export const getProduct_controller = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;

		const product = await getProduct_service(_id);

		return res.status(200).json(product);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};

// ****************************************************************************
// 										              crear
// ****************************************************************************

export const createProduct_controller = async (req: Request, res: Response) => {
	const { name, cost, currencyType, keywords, priority }: Product = req.body;

	try {
		const product = await createProduct_service({
			name,
			cost,
			currencyType,
			keywords,
			priority,
		});

		return res.status(200).json(product);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};

// ****************************************************************************
// 										              actualizar
// ****************************************************************************

export const updateProducts_controller = async (
	req: Request,
	res: Response
) => {
	const { _id } = req.params;
	const { name, cost, currencyType, keywords, priority }: Product = req.body;

	try {
		const product = await updateProducts_service(_id, {
			name,
			cost,
			currencyType,
			keywords,
			priority,
		});

		return res.status(200).json(product);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};

// ****************************************************************************
// 										              eliminar
// ****************************************************************************

export const deleteProduct_controller = async (req: Request, res: Response) => {
	const { _id } = req.params;

	try {
		const result = await deleteProduct_service(_id);

		return res.status(200).json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};
