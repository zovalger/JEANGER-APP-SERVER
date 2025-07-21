import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillService } from './bill.service';
import { BillGateway } from './bill.gateway';
import { BillModel } from './models';
import { AuthModule } from 'src/user-features/auth/auth.module';
import { BillController } from './bill.controller';
import { ForeignExchangeModule } from 'src/foreign-exchange/foreign-exchange.module';

@Module({
  imports: [
    AuthModule,
    ForeignExchangeModule,
    MongooseModule.forFeatureAsync([BillModel]),
  ],

  providers: [BillGateway, BillService],

  controllers: [BillController],
})
export class BillModule {}
