import { Test, TestingModule } from '@nestjs/testing';
import { ForeignExchangeController } from './foreign-exchange.controller';
import { ForeignExchangeService } from './foreign-exchange.service';

describe('ForeignExchangeController', () => {
  let controller: ForeignExchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForeignExchangeController],
      providers: [ForeignExchangeService],
    }).compile();

    controller = module.get<ForeignExchangeController>(ForeignExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
