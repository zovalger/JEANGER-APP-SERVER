import { Transform, TransformFnParams } from 'class-transformer';
import {
  isArray,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  MinLength,
} from 'class-validator';
import { CurrencyType } from 'src/common/enums/currency-type.enum';
import { keywordsNormalizeHelper } from '../helpers';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  cost: number;

  @IsString()
  @IsEnum(CurrencyType)
  currencyType: CurrencyType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: TransformFnParams) => {
    if (!isArray(value)) return [];

    if (value.filter((item) => !isString(item)).length) return [];

    const arr = value as string[];

    const uniquesValue: string[] = [];
    arr.map((item) => {
      if (!uniquesValue.includes(item.trim()))
        uniquesValue.push(keywordsNormalizeHelper(item));
    });

    return uniquesValue;
  })
  keywords?: string[];

  @IsNumber()
  priority: number;

  @IsBoolean()
  favorite;

  @IsOptional()
  @IsString()
  instructions: string;
}
