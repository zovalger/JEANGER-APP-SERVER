import mongoose from "mongoose";

import { UserThemes } from "../enum/user-themes.enum";
import { UserProfileFromDBDto } from "../dto/user-profile-from-db.dto";

const UserProfileSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		name: { type: String, trim: true, require: true },
		lastname: { type: String, trim: true, require: true },
		userColor: { type: String, trim: true, require: true, default: "#000000" },
		photoURL: { type: String, trim: true },
		UI_Settings: {
			theme: {
				type: String,
				trim: true,
				enum: Object.values(UserThemes),
				default: UserThemes.default,
			},
			nightMode: { type: String, trim: true, require: true },
			textSize: { type: String, trim: true, require: true },
		},
	},
	{ timestamps: true }
);

const UserProfileModel = mongoose.model<UserProfileFromDBDto>(
	"User",
	UserProfileSchema
);

export { UserProfileModel };
