import { Module } from '@nestjs/common';
import { ProductSettingService } from './product-setting.service';
import { ProductSettingController } from './product-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSettingModel } from './models';
import { ProductModule } from '../product/product.module';
import { AuthModule } from 'src/user-features/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    MongooseModule.forFeatureAsync([ProductSettingModel]),
  ],
  controllers: [ProductSettingController],
  providers: [ProductSettingService],
})
export class ProductSettingModule {}
