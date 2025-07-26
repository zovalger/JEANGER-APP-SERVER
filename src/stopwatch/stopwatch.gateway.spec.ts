import { Test, TestingModule } from '@nestjs/testing';
import { StopwatchGateway } from './stopwatch.gateway';
import { StopwatchService } from './stopwatch.service';

describe('StopwatchGateway', () => {
  let gateway: StopwatchGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StopwatchGateway, StopwatchService],
    }).compile();

    gateway = module.get<StopwatchGateway>(StopwatchGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
