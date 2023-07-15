import mongoose, { Document, mongo } from "mongoose";
import { CurrencyType, Product, ProductReference } from "../types";

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	cost: { type: Number, required: true },

	// tipo de moneda
	currencyType: {
		type: String,
		enum: Object.values(CurrencyType),
		required: true,
	},

	// costo por referencia
	costByReference: { type: Boolean, default: false },
	parentReferences: [
		{
			_id: mongoose.Schema.Types.ObjectId,
			cost: { type: Number, default: 0 },
			percentage: { type: Number, default: 1 },
		},
	],

	// palabras clave para busqueda
	keywords: { type: [String], required: true },
});

productSchema.methods.calculateCost = function (
	references: ProductReference[]
) {
	let total = 0;

	references.map((r) => {
		total += r.cost * r.percentage;
	});

	return total;
};

export default mongoose.model<Product>("Product", productSchema);
