import { Test, TestingModule } from '@nestjs/testing';
import { ProductSettingController } from './product-setting.controller';
import { ProductSettingService } from './product-setting.service';

describe('ProductSettingController', () => {
  let controller: ProductSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSettingController],
      providers: [ProductSettingService],
    }).compile();

    controller = module.get<ProductSettingController>(ProductSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
