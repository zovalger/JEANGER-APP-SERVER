import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillService } from './bill.service';
import { BillGateway } from './bill.gateway';
import { BillModel } from './models';
import { AuthModule } from 'src/user-features/auth/auth.module';
import { BillController } from './bill.controller';
import { ForeignExchangeModule } from 'src/foreign-exchange/foreign-exchange.module';
import { ProductFeaturesModule } from 'src/product-features/product-features.module';

@Module({
  imports: [
    AuthModule,
    ForeignExchangeModule,
    ProductFeaturesModule,
    MongooseModule.forFeatureAsync([BillModel]),
  ],

  providers: [BillGateway, BillService],

  controllers: [BillController],
})
export class BillModule {}
