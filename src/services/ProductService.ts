import { ObjectId } from "mongoose";
import ProductModel from "../models/Product.model";
import { Product, ProductFromDB } from "../types";
import {
	getCost_by_References_service,
	getProductReference_by_ParentId_service,
	updateProductReferences_Recursive_service,
} from "./ProductReferenceService";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

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
	_id: string | ObjectId
): Promise<ProductFromDB | undefined> => {
	try {
		const product = await ProductModel.findById(_id);

		return product || undefined;
	} catch (error) {
		console.log();
		return;
	}
};

// ****************************************************************************
// 										              crear
// ****************************************************************************

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

// ****************************************************************************
// 										              actualizar
// ****************************************************************************

export const updateProducts_service = async (
	_id: string,
	data: Product
): Promise<ProductFromDB | undefined> => {
	const { name, cost, currencyType, keywords, priority,favorite } = data;

	try {
		const product = await ProductModel.findById(_id);

		if (!product) return;

		product.name = name;
		product.currencyType = currencyType;
		product.keywords = keywords;
		product.cost = cost;
		product.priority = priority;
		product.favorite = favorite;

		await product.save();

		await updateProductReferences_Recursive_service(product._id);

		// await product.save();

		return product;
	} catch (error) {
		return;
	}
};

export const updateCost_by_References_service = async (
	productId: string | ObjectId
): Promise<ProductFromDB | undefined> => {
	try {
		console.log("actualizando costo de", productId);

		const product = await getProduct_service(productId);

		if (!product) {
			console.log("no hay producto que actualizar");
			return;
		}

		product.cost =
			(await getCost_by_References_service(productId)) || product.cost;

		await product.save();

		console.log("costo de", product.name, "actualizado");

		return product;
	} catch (error) {
		console.log();
		return;
	}
};

// ****************************************************************************
// 										              eliminar
// ****************************************************************************

export const deleteProduct_service = async (
	_id: string
): Promise<boolean | undefined> => {
	try {
		const childs = await getProductReference_by_ParentId_service(_id);

		if (childs && childs.length) return;

		const result = await ProductModel.deleteOne({ _id });

		return !!result.deletedCount;
	} catch (error) {
		return;
	}
};
