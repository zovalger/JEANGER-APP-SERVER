import mongoose from "mongoose";
import { CurrencyType, ProductReferenceFromDB } from "../types";

const productReferenceSchema = new mongoose.Schema({
	parentId: { type: mongoose.Schema.Types.ObjectId },
	childId: { type: mongoose.Schema.Types.ObjectId },
	cost: { type: Number, default: 0 },
	percentage: { type: Number, default: 1 },
	currencyType: {
		type: String,
		enum: Object.values(CurrencyType),
		required: true,
	},
});

export default mongoose.model<ProductReferenceFromDB>(
	"ProductReference",
	productReferenceSchema
);
