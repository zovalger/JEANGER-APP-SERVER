import { Test, TestingModule } from '@nestjs/testing';
import { ProductReferenceService } from './product-reference.service';

describe('ProductReferenceService', () => {
  let service: ProductReferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductReferenceService],
    }).compile();

    service = module.get<ProductReferenceService>(ProductReferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
