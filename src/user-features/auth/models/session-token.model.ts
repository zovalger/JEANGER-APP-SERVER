import mongoose from "mongoose";
import { ISessionTokenFromDBDto } from "../dto";

const SessionTokenSchema = new mongoose.Schema(
	{
		token: { type: String, trim: true, require: true },
	},
	{ timestamps: true }
);

const SessionTokenModel = mongoose.model<ISessionTokenFromDBDto>(
	"SesionToken",
	SessionTokenSchema
);

export { SessionTokenModel };
