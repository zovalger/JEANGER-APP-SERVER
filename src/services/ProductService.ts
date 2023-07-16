import { ObjectId } from "mongoose";
import ProductModel from "../models/Product.model";
import {
	CurrencyType,
	DolarValue,
	Product,
	ProductFromDB,
	ProductReference,
} from "../types";
import { getProductReference_by_ChildId_service } from "./ProductReferenceService";

export const getProducts_service = async (): Promise<
	ProductFromDB[] | [] | undefined
> => {
	try {
		const products = await ProductModel.find().sort({ name: 1 });

		return products;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getProduct_service = async (
	_id: string
): Promise<ProductFromDB | undefined> => {
	try {
		const product = await ProductModel.findById(_id);

		return product || undefined;
	} catch (error) {
		console.log();
		return;
	}
};

export const getCost_by_ChildId_service = async (
	childId: string | ObjectId,
	dolarValue: DolarValue
): Promise<number | undefined> => {
	try {
		const productReference = await getProductReference_by_ChildId_service(
			childId
		);

		if (!productReference) return;

		const cost = productReference.reduce(
			(total: number, reference: ProductReference) => {
				const { cost, currencyType } = reference;

				return total + currencyType == CurrencyType.USD
					? cost / dolarValue.value
					: cost;
			},
			0
		);

		return cost;
	} catch (error) {
		console.log();
		return 0;
	}
};

export const createProduct_service = async (
	data: Product
): Promise<ProductFromDB | undefined> => {
	try {
		const product = new ProductModel(data);

		await product.save();

		return product;
	} catch (error) {
		return;
	}
};

export const updateProducts_service = async (
	_id: string,
	data: Product
): Promise<ProductFromDB | undefined> => {
	const { name, cost, currencyType, keywords } = data;

	try {
		const product = await ProductModel.findById(_id);

		if (!product) return;

		product.name = name;
		product.currencyType = currencyType;
		product.keywords = keywords;

		// todo: ver que no tenga referencias
		if (typeof cost === "number") product.cost = cost;

		await product.save();

		return product;
	} catch (error) {
		return;
	}
};

// todo: actualizar cost de hijos de hijos

// actualizar referencias y los costos de todos los productos dependientes

// export const recursiveUpdateCostProduct_service = async (
// 	parentId: string,
// 	cost: number,
// 	currencyType: CurrencyType
// ) => {
// 	const products = await ProductModel.find({
// 		parentReferences: { $in: [{ _id: parentId }] },
// 	});

// await Promise.all(
// 	await products.map(async (product: Product) => {
// 		product.parentReferences = product.parentReferences.map(
// 			(reference: ProductReference) =>
// 				reference.parentId?.toString() == parentId.toString()
// 					? { ...reference, cost, currencyType }
// 					: reference
// 		);

// 		product.cost = product.calculateCost(product.parentReferences);

// 		await product.save();

// 		await recursiveUpdateCostProduct_service(
// 			product._id,
// 			product.cost,
// 			product.currencyType
// 		);
// 	})
// );
// };

export const deleteProduct_service = async (
	_id: string
): Promise<boolean | undefined> => {
	try {
		const childs = await ProductModel.find({
			parentReferences: { $in: [{ _id }] },
		});

		if (childs.length) return;

		const result = await ProductModel.deleteOne({ _id });

		return !!result.deletedCount;
	} catch (error) {
		return;
	}
};
