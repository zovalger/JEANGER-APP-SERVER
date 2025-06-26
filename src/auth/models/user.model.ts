import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserPermissions } from "../enum/user-permissions.enum";
import { UserFromDBDto } from "../dto/user-from-db.dto";

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, trim: true, require: true, unique: true },
		password: { type: String, require: true, default: "" },
		permissions: [{ type: String, enum: UserPermissions }],
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) next();

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);

	user.password = hash;

	next();
});

UserSchema.methods.comparePassword = async function (passwordReceived: string) {
	return await bcrypt.compare(passwordReceived, this.password);
};

export default mongoose.model<UserFromDBDto>("User", UserSchema);
