import { Test, TestingModule } from '@nestjs/testing';
import { ForeignExchangeGateway } from './foreign-exchange.gateway';

describe('ForeignExchangeGateway', () => {
  let gateway: ForeignExchangeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForeignExchangeGateway],
    }).compile();

    gateway = module.get<ForeignExchangeGateway>(ForeignExchangeGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
