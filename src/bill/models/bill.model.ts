import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { CurrencyType } from 'src/common/enums/currency-type.enum';
import {
  ForeignExchange,
  ForeignExchangeDocument,
} from 'src/foreign-exchange/models/foreign-exchange.model';
import { User } from 'src/user-features/user/models/user.model';

@Schema({ timestamps: true })
export class BillItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  productId: mongoose.Types.ObjectId;

  @Prop({ type: Number, default: 1 })
  quantity: number;

  @Prop({ type: Number, default: 0 })
  cost: number;

  @Prop({ type: String, enum: Object.values(CurrencyType), required: true })
  currencyType: CurrencyType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  createdBy: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

@Schema()
export class Totals {
  @Prop({ type: Number, default: 0 })
  BSF: number;

  @Prop({ type: Number, default: 0 })
  USD: number;
}

export type BillDocument = HydratedDocument<Bill>;

@Schema({ timestamps: true })
export class Bill {
  @Prop({ type: String, required: true, unique: true })
  tempId: string;

  @Prop({ type: String, trim: true, default: '' })
  name: string;

  @Prop({
    type: [BillItem],
    default: [],
  })
  items: BillItem[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ForeignExchange.name,
    default: null,
  })
  foreignExchange: ForeignExchangeDocument;

  @Prop({
    type: Totals,
  })
  totals: Totals;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  createdBy: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BillSchema = SchemaFactory.createForClass(Bill);

export const BillModel = {
  name: Bill.name,

  useFactory: () => {
    const schema = BillSchema;

    schema.pre('findOne', function (next) {
      this.populate('foreignExchange');
      next();
    });

    schema.pre('find', function (next) {
      this.populate('foreignExchange');
      next();
    });

    return schema;
  },
};
