import { IsMongoId, IsNumber, IsPositive } from 'class-validator';

export class CreateProductReferenceDto {
  @IsMongoId()
  parentId: string;

  @IsMongoId()
  childId: string;

  @IsNumber()
  @IsPositive()
  percentage: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}
