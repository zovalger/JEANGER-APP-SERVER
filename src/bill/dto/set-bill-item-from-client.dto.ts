import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
} from 'class-validator';
import { CurrencyType } from 'src/common/enums/currency-type.enum';

export class SetBillItemDto {
  @IsMongoId()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  cost: number;

  @IsString()
  @IsEnum(CurrencyType)
  currencyType: CurrencyType;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
