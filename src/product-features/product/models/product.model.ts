import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { CurrencyType } from 'src/common/enums/currency-type.enum';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true, default: 0 })
  cost: number;

  @Prop({
    type: String,
    required: true,
    default: CurrencyType.USD,
    enum: CurrencyType,
  })
  currencyType: CurrencyType;

  @Prop({
    type: [String],
    default: [],
  })
  keywords: string[];

  @Prop({
    type: [String],
    default: [],
  })
  autoKeywords: string[];

  @Prop({ type: Number, default: 0 })
  priority: number;

  @Prop({ type: Boolean, default: false })
  favorite: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export const ProductModel = {
  name: Product.name,

  useFactory: () => {
    const schema = ProductSchema;

    schema.pre('save', function (next) {
      const product = this as ProductDocument;

      if (!product.isModified('name')) next();

      const { name } = product;

      const r = new RegExp(
        '([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+',
        'gi',
      );

      product.autoKeywords = name
        .toLowerCase()
        .normalize('NFD')
        .replace(r, '$1')
        .normalize()
        .split(' ');

      next();
    });

    // schema.methods.comparePassword = function (passwordReceived: string) {
    //   const user = this as ProductDocument;

    //   return bcrypt.compareSync(passwordReceived, user.password);
    // };

    return schema;
  },
};
