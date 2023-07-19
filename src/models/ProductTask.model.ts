import mongoose from "mongoose";
import { ProductTask } from "../types";

const ProductTaskSchema = new mongoose.Schema({
	productId: { type: mongoose.Schema.ObjectId },
	date: { type: Date, default: new Date() },
	timeoutId: { type: Number, default: null },
});

export default mongoose.model<ProductTask>("ProductTask", ProductTaskSchema);
