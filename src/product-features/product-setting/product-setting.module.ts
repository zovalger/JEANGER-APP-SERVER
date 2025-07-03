import { Module } from '@nestjs/common';
import { ProductSettingService } from './product-setting.service';
import { ProductSettingController } from './product-setting.controller';

@Module({
  controllers: [ProductSettingController],
  providers: [ProductSettingService],
})
export class ProductSettingModule {}
