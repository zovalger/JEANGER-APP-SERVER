import mongoose from "mongoose";
import { CurrencyType, ProductFromDB } from "../types";

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	cost: { type: Number, required: true },

	// tipo de moneda
	currencyType: {
		type: String,
		enum: Object.values(CurrencyType),
		required: true,
	},

	// palabras clave para busqueda
	keywords: { type: [String], required: true },
});

// actualizar el valor de las referecias

// actualizar el valor del precio segun sus referencias

export default mongoose.model<ProductFromDB>("Product", productSchema);
