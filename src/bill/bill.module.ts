import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillGateway } from './bill.gateway';

@Module({
  providers: [BillGateway, BillService],
})
export class BillModule {}
