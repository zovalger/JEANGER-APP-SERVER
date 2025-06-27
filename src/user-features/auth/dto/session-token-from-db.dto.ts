import mongoose from "mongoose";
import { ISessionToken } from "../interfaces";

export interface ISessionTokenFromDBDto extends Omit<ISessionToken, "_id">, Document {
	_id: mongoose.Schema.Types.ObjectId;
}
