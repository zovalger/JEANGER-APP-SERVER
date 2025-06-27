import mongoose from "mongoose";
import { IUser } from "../interfaces";

export interface UserFromDBDto extends Omit<IUser, "_id">, Document {
	_id: mongoose.Schema.Types.ObjectId;
	comparePassword(passwordReceived: string): Promise<boolean>;
}
