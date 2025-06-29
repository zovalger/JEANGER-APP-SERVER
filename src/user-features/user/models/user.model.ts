import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserPermissions } from '../enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, trim: true, required: true, unique: true })
  email: string;

  @Prop({ type: String, require: true })
  password: string;

  @Prop({ type: [String], enum: UserPermissions })
  permissions: UserPermissions[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  comparePassword: (passwordReceived: string) => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = {
  name: User.name,

  useFactory: () => {
    const schema = UserSchema;

    schema.pre('save', async function (next) {
      const user = this as UserDocument;

      if (!user.isModified('password')) next();

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;

      next();
    });

    schema.methods.comparePassword = function (passwordReceived: string) {
      const user = this as UserDocument;

      return bcrypt.compareSync(passwordReceived, user.password);
    };

    return schema;
  },
};
