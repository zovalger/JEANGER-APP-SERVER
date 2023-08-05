import mongoose from "mongoose";
import { StopwatchFromDB } from "../types";

const stopwatchSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	timeDate: { type: Number, default: null },
	accumulatedTime: { type: Number, default: 0 },
	timeSeted: { type: Number, default: 0 },
});

// actualizar el valor de las referecias

// actualizar el valor del precio segun sus referencias

export default mongoose.model<StopwatchFromDB>("Stopwatch", stopwatchSchema);
