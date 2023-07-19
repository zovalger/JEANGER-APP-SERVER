import mongoose from "mongoose";
import { DolarValueFromDB } from "../types";

const DolarValueSchema = new mongoose.Schema({
	date: { type: Date, default: new Date() },
	value: Number,
});

export default mongoose.model<DolarValueFromDB>("DolarValue", DolarValueSchema);
