import mongoose from "mongoose";
import { ProductSettingsFromDB } from "../types";

const ProductSettingsSchema = new mongoose.Schema({
	stopwatchProductId: { type: mongoose.Schema.Types.ObjectId },
});

export default mongoose.model<ProductSettingsFromDB>(
	"ProductSettings",
	ProductSettingsSchema
);
