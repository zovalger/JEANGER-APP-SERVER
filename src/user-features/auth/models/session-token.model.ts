import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TokenTypes } from '../enum';

export type SessionTokenDocument = HydratedDocument<SessionToken>;

@Schema({ timestamps: true })
export class SessionToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  token: string;

  @Prop({ type: String, required: true, enum: TokenTypes })
  type: TokenTypes;

  @Prop({ type: Date, required: true })
  expiration: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SessionTokenSchema = SchemaFactory.createForClass(SessionToken);

export const SessionTokenModel = {
  name: SessionToken.name,

  useFactory: () => {
    const schema = SessionTokenSchema;

    return schema;
  },
};
