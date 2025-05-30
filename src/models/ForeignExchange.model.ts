import mongoose from "mongoose";
import { ForeignExchangeFromDB } from "../types";

const ForeignExchangeSchema = new mongoose.Schema({
	date: { type: Date, default: new Date() },
	dolar: Number,
	euro: Number,
	bankBusinessDate: Date,
});

export default mongoose.model<ForeignExchangeFromDB>(
	"ForeignExchange",
	ForeignExchangeSchema
);
