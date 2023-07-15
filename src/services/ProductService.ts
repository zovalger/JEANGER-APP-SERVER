import ProductModel from "../models/Product.model";
import { Frontend_Product, Product, ProductReference } from "../types";

export const getProducts_service = async (): Promise<Product[] | undefined> => {
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
): Promise<Product | undefined> => {
	try {
		const product = await ProductModel.findById(_id);

		return product || undefined;
	} catch (error) {
		console.log();
		return;
	}
};

export const createProduct_service = async (
	data: Frontend_Product
): Promise<Product | undefined> => {
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
	data: Frontend_Product
): Promise<Product | undefined> => {
	const {
		name,
		cost,
		currencyType,
		keywords,
		costByReference,
		parentReferences,
	} = data;

	try {
		const product = await ProductModel.findById(_id);

		if (!product) return;

		product.name = name;
		product.currencyType = currencyType;
		product.keywords = keywords;
		product.costByReference = costByReference;
		product.parentReferences = parentReferences;

		product.cost =
			parentReferences.length > 0
				? product.calculateCost(parentReferences)
				: cost;

		await product.save();

		await recursiveUpdateCostProduct_service(product._id, product.cost);

		return product;
	} catch (error) {
		return;
	}
};

// actualizar referencias y los costos de todos los productos dependientes

export const recursiveUpdateCostProduct_service = async (
	parentId: string,
	cost: number
) => {
	const products = await ProductModel.find({
		parentReferences: { $in: [{ _id: parentId }] },
	});

	await Promise.all(
		await products.map(async (product: Product) => {
			product.parentReferences = product.parentReferences.map(
				(reference: ProductReference) =>
					reference.parentId?.toString() == parentId.toString()
						? { ...reference, cost }
						: reference
			);

			product.cost = product.calculateCost(product.parentReferences);

			await product.save();

			await recursiveUpdateCostProduct_service(product._id, product.cost);
		})
	);
};

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
