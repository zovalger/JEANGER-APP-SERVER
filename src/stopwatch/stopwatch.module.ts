import { Module } from '@nestjs/common';
import { StopwatchService } from './stopwatch.service';
import { StopwatchGateway } from './stopwatch.gateway';

@Module({
  providers: [StopwatchGateway, StopwatchService],
})
export class StopwatchModule {}
