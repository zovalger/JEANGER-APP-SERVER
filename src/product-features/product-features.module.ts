import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ProductSettingModule } from './product-setting/product-setting.module';

@Module({
  imports: [ProductModule, ProductSettingModule],
})
export class ProductFeaturesModule {}
