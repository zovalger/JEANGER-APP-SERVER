import { ObjectId } from "mongoose";
import ProductReferenceModel from "../models/ProductReference.model";
import { ProductReference, ProductReferenceFromDB } from "../types";

// ****************************************************************************
// 										              Crear
// ****************************************************************************

export const createProductReference_service = async (
	data: ProductReference
): Promise<ProductReferenceFromDB | undefined> => {
	try {
		const oldReference = await ProductReferenceModel.findOne({
			parentId: data.parentId,
			childId: data.childId,
		});

		if (oldReference) return;

		const productReference = new ProductReferenceModel(data);

		await productReference.save();

		return productReference;
	} catch (error) {
		return;
	}
};

export const createBulkProductReference_service = async (
	data: ProductReference[]
): Promise<(ProductReferenceFromDB | undefined)[] | undefined> => {
	try {
		return await Promise.all(
			await data.map(
				async (referece) => await createProductReference_service(referece)
			)
		);
	} catch (error) {
		return;
	}
};

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getProductsReferences_service = async (): Promise<
	ProductReferenceFromDB[] | [] | undefined
> => {
	try {
		const productsReferences = await ProductReferenceModel.find();

		return productsReferences;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getProductReference_service = async (
	_id: string
): Promise<ProductReferenceFromDB | undefined> => {
	try {
		const productReference = await ProductReferenceModel.findById(_id);

		return productReference || undefined;
	} catch (error) {
		console.log();
		return;
	}
};

export const getProductReference_by_ParentId_service = async (
	parentId: string | ObjectId
): Promise<ProductReferenceFromDB[] | undefined> => {
	try {
		const productReference = await ProductReferenceModel.find({ parentId });

		return productReference || undefined;
	} catch (error) {
		console.log();
		return;
	}
};

export const getProductReference_by_ChildId_service = async (
	childId: string | ObjectId
): Promise<ProductReferenceFromDB[] | undefined> => {
	try {
		const productReference = await ProductReferenceModel.find({ childId });

		return productReference || undefined;
	} catch (error) {
		console.log();
		return;
	}
};
// ****************************************************************************
// 										              eliminar
// ****************************************************************************

export const deleteProductReference_service = async (
	_id: string | ObjectId
): Promise<boolean | undefined> => {
	try {
		const result = await ProductReferenceModel.deleteOne({ _id });

		return !!result.deletedCount;
	} catch (error) {
		return;
	}
};

export const deleteProductReference_by_ProductsId_service = async (
	parentId: string | ObjectId,
	childId: string | ObjectId
): Promise<boolean | undefined> => {
	try {
		const result = await ProductReferenceModel.deleteOne({ parentId, childId });

		return !!result.deletedCount;
	} catch (error) {
		return;
	}
};

// ****************************************************************************
// 										              actualizar
// ****************************************************************************

export const updateProductReferences_service = async (
	_id: string,
	data: ProductReference
): Promise<ProductReferenceFromDB | undefined> => {
	const { cost, currencyType, percentage } = data;

	try {
		const productReference = await ProductReferenceModel.findById(_id);

		if (!productReference) return;

		productReference.currencyType = currencyType;
		productReference.percentage = percentage;
		productReference.cost = cost;

		await productReference.save();

		return productReference;
	} catch (error) {
		return;
	}
};

export const updateProductReferences_By_Parent_service = async (
	data: ProductReference
): Promise<ProductReferenceFromDB[] | undefined> => {
	const { parentId, cost, currencyType } = data;

	try {
		await ProductReferenceModel.findOneAndUpdate(
			{ parentId },
			{ cost, currencyType }
		);

		return await ProductReferenceModel.find({ parentId });
	} catch (error) {
		return;
	}
};

export const updateProductReferences_By_Child_service = async (
	data: ProductReference
): Promise<ProductReferenceFromDB[] | undefined> => {
	const { parentId, cost, currencyType, percentage } = data;

	try {
		await ProductReferenceModel.findOneAndUpdate(
			{ parentId },
			{ cost, currencyType, percentage }
		);

		return await ProductReferenceModel.find({ parentId });
	} catch (error) {
		return;
	}
};
