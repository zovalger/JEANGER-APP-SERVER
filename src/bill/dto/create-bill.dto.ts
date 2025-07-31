import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SetBillItemDto } from './set-bill-item.dto';

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
  @Type(() => SetBillItemDto)
  items?: SetBillItemDto[];

  // @IsOptional()
  // @IsString()
  // @IsMongoId()
  // foreignExchange?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TotalsDto)
  totals?: TotalsDto;

  @IsMongoId()
  createdBy: string;

  @IsOptional()
  @IsDateString()
  createdAt: string;

  @IsOptional()
  @IsDateString()
  updatedAt: string;
}
