import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateProductReferenceDto } from './create-product-reference.dto';

export class UpdateProductReferenceDto extends PartialType(
  PickType(CreateProductReferenceDto, ['amount', 'percentage']),
) {}
