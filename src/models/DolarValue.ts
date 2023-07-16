import mongoose from "mongoose";
import { DolarValue } from "../types";

const DolarValueSchema = new mongoose.Schema({
	date: { type: Date, default: new Date() },
	value: Number,
});

export default mongoose.model<DolarValue>("DolarValueSch", DolarValueSchema);
