import { Test, TestingModule } from '@nestjs/testing';
import { BillGateway } from './bill.gateway';
import { BillService } from './bill.service';

describe('BillGateway', () => {
  let gateway: BillGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillGateway, BillService],
    }).compile();

    gateway = module.get<BillGateway>(BillGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
