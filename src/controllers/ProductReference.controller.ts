import { Request, Response } from "express";
import { ProductReference } from "../types";
import {
	createBulkProductReference_service,
	createProductReference_service,
	deleteProductReference_service,
	getProductReference_by_ChildId_service,
	getProductReference_by_ParentId_service,
	updateProductReferences_service,
} from "../services/ProductReferenceService";

// ****************************************************************************
// 										              Crear
// ****************************************************************************


export const createProductReference_controller = async (
	req: Request,
	res: Response
) => {
	const data: ProductReference | ProductReference[] = req.body;

	try {
		const productReference =
			data instanceof Array
				? await createBulkProductReference_service(data)
				: await createProductReference_service(data);

		return res.status(200).json(productReference);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};
// ****************************************************************************
// 										              obtener
// ****************************************************************************


export const getProductReference_By_ParentId_controller = async (
	req: Request,
	res: Response
) => {
	const { parentId } = req.params;

	try {
		const productReference = await getProductReference_by_ParentId_service(
			parentId
		);

		return res.status(200).json(productReference);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};

export const getProductReference_By_ChildId_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { _id } = req.params;

		const productReference = await getProductReference_by_ChildId_service(_id);

		return res.status(200).json(productReference);
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
		const result = await deleteProductReference_service(_id);

		return res.status(200).json(result);
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
	const data: ProductReference = req.body;

	try {
		const productReference = await updateProductReferences_service(_id, data);

		return res.status(200).json(productReference);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};


// todo: actualizar por array de datos