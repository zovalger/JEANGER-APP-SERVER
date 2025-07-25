import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CurrencyType } from 'src/common/enums/currency-type.enum';
import mongoose from 'mongoose';

class ItemDto {
  @IsMongoId()
  productId: string | mongoose.Types.ObjectId;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  cost: number;

  @IsString()
  @IsEnum(CurrencyType)
  currencyType: CurrencyType;

  @IsDateString()
  createdAt: Date | string;

  @IsDateString()
  updatedAt: Date | string;
}

class TotalsDto {
  @IsNumber()
  BSF: number;

  @IsNumber()
  USD: number;
}

export class CreateBillDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsUUID()
  tempId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items?: ItemDto[];

  // @IsOptional()
  // @IsString()
  // @IsMongoId()
  // foreignExchange?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TotalsDto)
  totals?: TotalsDto;

  @IsOptional()
  @IsDateString()
  createdAt: Date | string;

  @IsOptional()
  @IsDateString()
  updatedAt: Date | string;
}
