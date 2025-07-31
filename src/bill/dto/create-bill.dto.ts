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

class BillItemDto {
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
  @IsUUID()
  tempId: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillItemDto)
  items?: BillItemDto[];

  // @IsOptional()
  // @IsString()
  // @IsMongoId()
  // foreignExchange?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TotalsDto)
  totals?: TotalsDto;

  // @IsMongoId()
  // createdBy: string;

  @IsOptional()
  @IsDateString()
  createdAt: string;

  @IsOptional()
  @IsDateString()
  updatedAt: string;
}
