import { Test, TestingModule } from '@nestjs/testing';
import { ProductReferenceController } from './product-reference.controller';
import { ProductReferenceService } from './product-reference.service';

describe('ProductReferenceController', () => {
  let controller: ProductReferenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductReferenceController],
      providers: [ProductReferenceService],
    }).compile();

    controller = module.get<ProductReferenceController>(ProductReferenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
