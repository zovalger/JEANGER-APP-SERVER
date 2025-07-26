import { IsDateString, IsMongoId, IsNumber, IsPositive } from 'class-validator';

export class SetBillItemDto {
  @IsMongoId()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  // @IsNumber()
  // cost: number;

  // @IsString()
  // @IsEnum(CurrencyType)
  // currencyType: CurrencyType;

  @IsMongoId()
  createdBy: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
