import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ProductReferenceModule } from './product-reference/product-reference.module';
import { ProductSettingModule } from './product-setting/product-setting.module';

@Module({
  imports: [ProductModule, ProductReferenceModule, ProductSettingModule]
})
export class ProductFeaturesModule {}
