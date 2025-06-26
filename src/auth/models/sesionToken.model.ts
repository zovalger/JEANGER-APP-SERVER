import mongoose from "mongoose";

export interface SesionTokenAttributes {
	_id: string;
	token: string;
}

export interface SesionToken_from_DB extends SesionTokenAttributes, Document {}

const SesionTokenSchema = new mongoose.Schema(
	{
		token: { type: String, trim: true, require: true },
	},
	{ timestamps: true }
);

export default mongoose.model<SesionToken_from_DB>(
	"SesionToken",
	SesionTokenSchema
);
