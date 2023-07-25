import { Request, Response } from "express";
import { ProductReference } from "../types";
import {
	createProductReference_service,
	deleteProductReference_by_ProductsId_service,
	getPosibleProductParents_By_ProductId_service,
	getProductReference_by_ChildId_service,
	getProductReference_by_ParentId_service,
	updateProductReference_service,
} from "../services/ProductReferenceService";

// ****************************************************************************
// 										              Crear
// ****************************************************************************

export const createProductReference_controller = async (
	req: Request,
	res: Response
) => {
	const { parentId, childId } = req.params;

	const { percentage, amount }: ProductReference = req.body;

	try {
		const productReference = await createProductReference_service({
			parentId,
			childId,
			percentage,
			amount,
		});

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

export const getPosibleProductParents_By_ProductId_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { _id } = req.params;

		const productPosibleParents =
			await getPosibleProductParents_By_ProductId_service(_id);

		return res.status(200).json(productPosibleParents);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};

// ****************************************************************************
// 										              eliminar
// ****************************************************************************

export const deleteProductReference_controller = async (
	req: Request,
	res: Response
) => {
	const { parentId, childId } = req.params;

	try {
		const result = await deleteProductReference_by_ProductsId_service(
			parentId,
			childId
		);

		return res.status(200).json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};

// ****************************************************************************
// 										              actualizar
// ****************************************************************************

export const updateProductReference_controller = async (
	req: Request,
	res: Response
) => {
	const { parentId, childId } = req.params;
	const { percentage, amount }: ProductReference = req.body;

	try {
		const productReference = await updateProductReference_service({
			percentage,
			amount,
			parentId,
			childId,
		});

		return res.status(200).json(productReference);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: "" });
	}
};
