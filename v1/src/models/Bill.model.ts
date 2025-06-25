import mongoose from "mongoose";
import { BillFromDB, CurrencyType } from "../types";

const billSchema = new mongoose.Schema({
	name: { type: String, trim: true },

	date: { type: Date, default: new Date() },

	items: [
		{
			productId: { type: mongoose.Schema.Types.ObjectId },
			quantity: { type: Number, default: 1 },
			cost: { type: Number, default: 0 },
			currencyType: {
				type: String,
				enum: Object.values(CurrencyType),
				required: true,
			},
		},
	],

	foreignExchange: {
		euro: { type: Number, default: 0 },
		dolar: { type: Number, default: 0 },
		date: { type: Date, default: new Date() },
	},

	totals: { BSF: Number, USD: Number },
});

// actualizar el valor de las referecias

// actualizar el valor del precio segun sus referencias

export default mongoose.model<BillFromDB>("Bill", billSchema);
