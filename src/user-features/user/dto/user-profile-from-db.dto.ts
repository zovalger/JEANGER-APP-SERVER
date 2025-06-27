import mongoose from "mongoose";
import { IUserProfile } from "../interfaces";

export interface UserProfileFromDBDto extends Omit<IUserProfile, "_id">, Document {
	_id: mongoose.Schema.Types.ObjectId;
}
