import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductDocument } from './product.model';

export type ProductReferenceDocument = HydratedDocument<ProductReference>;

@Schema({ timestamps: true })
export class ProductReference {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  parentId: mongoose.Types.ObjectId | ProductDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  childId: mongoose.Types.ObjectId | ProductDocument;

  @Prop({ type: Number, default: 1, required: true })
  percentage: number;

  @Prop({ type: Number, required: true, default: 1 })
  amount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductReferenceSchema =
  SchemaFactory.createForClass(ProductReference);

export const ProductReferenceModel = {
  name: ProductReference.name,

  useFactory: () => {
    const schema = ProductReferenceSchema;

    return schema;
  },
};
