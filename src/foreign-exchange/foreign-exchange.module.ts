import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForeignExchangeService } from './foreign-exchange.service';
import { ForeignExchangeController } from './foreign-exchange.controller';
import { ForeignExchangeModel } from './models/foreign-exchange.model';
import { AuthModule } from 'src/user-features/auth/auth.module';
import { ForeignExchangeGateway } from './foreign-exchange.gateway';

@Module({
  imports: [AuthModule, MongooseModule.forFeatureAsync([ForeignExchangeModel])],
  controllers: [ForeignExchangeController],
  providers: [ForeignExchangeService, ForeignExchangeGateway],
  exports: [ForeignExchangeService],
})
export class ForeignExchangeModule {}
