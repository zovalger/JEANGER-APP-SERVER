import { Module } from '@nestjs/common';
import { StopwatchService } from './stopwatch.service';
import { StopwatchGateway } from './stopwatch.gateway';
import { AuthModule } from 'src/user-features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StopwatchModel } from './models';
import { StopwatchController } from './stopwatch.controller';

@Module({
  imports: [AuthModule, MongooseModule.forFeatureAsync([StopwatchModel])],
  providers: [StopwatchGateway, StopwatchService],
  controllers: [StopwatchController],
  exports: [StopwatchService],
})
export class StopwatchModule {}
