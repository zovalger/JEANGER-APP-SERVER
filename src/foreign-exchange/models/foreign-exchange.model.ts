import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ForeignExchangeDocument = HydratedDocument<ForeignExchange>;

@Schema({ timestamps: true })
export class ForeignExchange {
  @Prop({ type: Number, required: true, default: 0 })
  dolar: number;

  @Prop({ type: Number, required: true, default: 0 })
  euro: number;

  @Prop({ type: Date, required: true })
  bankBusinessDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy?: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ForeignExchangeSchema =
  SchemaFactory.createForClass(ForeignExchange);

export const ForeignExchangeModel = {
  name: ForeignExchange.name,

  useFactory: () => {
    const schema = ForeignExchangeSchema;

    return schema;
  },
};
