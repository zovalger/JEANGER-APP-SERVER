import { Test, TestingModule } from '@nestjs/testing';
import { ProductSettingService } from './product-setting.service';

describe('ProductSettingService', () => {
  let service: ProductSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSettingService],
    }).compile();

    service = module.get<ProductSettingService>(ProductSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
