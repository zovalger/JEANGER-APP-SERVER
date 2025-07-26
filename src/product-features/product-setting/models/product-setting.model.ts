import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from 'src/product-features/product/models';
import { User } from 'src/user-features/user/models/user.model';

export type ProductSettingDocument = HydratedDocument<ProductSetting>;

@Schema({ timestamps: true })
export class ProductSetting {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  stopwatchProduct: mongoose.Types.ObjectId;

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

export const ProductSettingSchema =
  SchemaFactory.createForClass(ProductSetting);

export const ProductSettingModel = {
  name: ProductSetting.name,

  useFactory: () => {
    const schema = ProductSettingSchema;

    return schema;
  },
};
