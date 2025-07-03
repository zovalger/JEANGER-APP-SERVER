import { Test, TestingModule } from '@nestjs/testing';
import { ForeignExchangeService } from './foreign-exchange.service';

describe('ForeignExchangeService', () => {
  let service: ForeignExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForeignExchangeService],
    }).compile();

    service = module.get<ForeignExchangeService>(ForeignExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
