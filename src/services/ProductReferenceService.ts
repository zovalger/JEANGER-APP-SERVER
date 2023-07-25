import { ObjectId } from "mongoose";
import ProductReferenceModel from "../models/ProductReference.model";
import {
	CurrencyType,
	ProductReference,
	ProductReferenceFromDB,
} from "../types";
import {
	getProduct_service,
	updateCost_by_References_service,
} from "./ProductService";
import { getDolar_service } from "./DolarService";
import ProductModel from "../models/Product.model";

// ****************************************************************************
// 										              Crear
// ****************************************************************************

export const createProductReference_service = async (
	data: Omit<ProductReference, "cost" | "currencyType">
): Promise<ProductReferenceFromDB | undefined> => {
	const { parentId, childId } = data;

	try {
		const oldReference = await ProductReferenceModel.findOne({
			parentId,
			childId,
		});

		// si existe se actualiza
		if (oldReference) return await updateProductReference_service(data);

		// sino se crea
		const product = await getProduct_service(parentId);
		if (!product) return;
		const { cost, currencyType } = product;

		const productReference = new ProductReferenceModel({
			...data,
			cost,
			currencyType,
		});

		await productReference.save();
		console.log("referencia creada");

		await updateProductReferences_Recursive_service(productReference.childId);

		return productReference;
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

export const getPosibleProductParents_By_ProductId_service = async (
	childId: string | ObjectId
): Promise<string[] | undefined> => {
	try {
		const curretParents = await ProductReferenceModel.find({ childId });

		const noId = [childId, ...curretParents.map((v) => v.parentId)];

		for (let index = 1; index < noId.length; index++) {
			const p = noId[index];

			const afterParent = await ProductReferenceModel.find({ childId: p });

			afterParent.forEach((pr) => {
				const found = noId.find((id) => id.toString() === pr.parentId.toString());

				if (!found) noId.push(pr.parentId);
			});
		}

		const toParents = await ProductModel.find().where("_id", { $nin: noId });

		return toParents.map((v) => v._id) || undefined;
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

export const getCost_by_References_service = async (
	productId: string | ObjectId
): Promise<number> => {
	try {
		const dolar = await getDolar_service();
		const productReference = await getProductReference_by_ChildId_service(
			productId
		);

		if (!productReference) return 0;

		const cost = productReference.reduce(
			(total: number, reference: ProductReference) => {
				const { cost, currencyType, amount, percentage } = reference;

				let toSum = cost * percentage * amount;

				if (currencyType == CurrencyType.BSF) toSum = toSum / dolar.value;

				console.log(reference, toSum);

				return total + toSum;
			},
			0
		);

		console.log("total", cost);

		return cost;
	} catch (error) {
		console.log();
		return 0;
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

		await updateProductReferences_Recursive_service(_id);

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

		await updateProductReferences_Recursive_service(childId);

		return !!result.deletedCount;
	} catch (error) {
		return;
	}
};

// ****************************************************************************
// 										              actualizar
// ****************************************************************************

// actualizar una sola referencia
export const updateProductReference_service = async (
	data: Omit<ProductReference, "cost" | "currencyType">
): Promise<ProductReferenceFromDB | undefined> => {
	const { percentage, amount, parentId, childId } = data;

	try {
		const productReference = await ProductReferenceModel.findOne({
			parentId,
			childId,
		});

		if (!productReference) return;

		const product = await getProduct_service(parentId);
		if (!product) return;

		const { cost, currencyType } = product;

		productReference.currencyType = currencyType;
		productReference.percentage = percentage;
		productReference.amount = amount;
		productReference.cost = cost;

		await productReference.save();

		await updateProductReferences_Recursive_service(productReference.childId);

		return productReference;
	} catch (error) {
		return;
	}
};

// actualizar todas las referencias donde el padre sea el parentid
export const updateProductReferences_By_Parent_service = async (
	data: Partial<ProductReference>
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

// actualizar todas las referencias donde el padre sea el parentid
export const updateProductReferences_By_Parent_recursive_service = async (
	data: Partial<ProductReference>
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

// actualizar todas las referencias donde sea un hijo
export const updateProductReferences_By_Child_service = async (
	data: ProductReference
): Promise<ProductReferenceFromDB[] | undefined> => {
	const { childId, cost, currencyType, percentage, amount } = data;

	try {
		await ProductReferenceModel.findOneAndUpdate(
			{ childId },
			{ cost, currencyType, percentage, amount }
		);

		return await ProductReferenceModel.find({ childId });
	} catch (error) {
		return;
	}
};

// ****************************************************************************
// 										        actualizar hijos
// ****************************************************************************

// actualizar las referencias hijas
export const updateProductReferences_Recursive_service = async (
	productId: string | ObjectId
): Promise<void> => {
	try {
		console.log("actualizador recursivo");

		const product = await updateCost_by_References_service(productId);

		if (!product) return;

		const childsReferences = await updateProductReferences_By_Parent_service({
			parentId: product._id,
			cost: product.cost,
			currencyType: product.currencyType,
		});

		if (!childsReferences) return;

		await Promise.all(
			await childsReferences.map(
				async (r) => await updateProductReferences_Recursive_service(r.childId)
			)
		);

		return;
	} catch (error) {
		return;
	}
};
