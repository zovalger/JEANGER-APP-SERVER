import { Transform, TransformFnParams } from 'class-transformer';
import {
  isArray,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  isString,
  IsString,
  MinLength,
} from 'class-validator';
import { CurrencyType } from 'src/common/enums/currency-type.enum';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  cost: number;

  @IsString()
  @IsEnum(CurrencyType)
  currencyType: CurrencyType;

  @IsArray()
  @Transform(({ value, obj, key, options, type }: TransformFnParams) => {
    console.log(obj);
    console.log(key);
    console.log(options);
    console.log(type);

    console.log('**************');

    if (!isArray(value)) return [];

    if (value.filter((item) => !isString(item)).length) return [];

    const arr = value as string[];

    const uniquesValue: string[] = [];

    arr.map((item) => {
      if (!uniquesValue.includes(item.trim())) uniquesValue.push(item.trim());
    });

    return uniquesValue;
  })
  keywords: string[];

  @IsArray()
  @Transform(({ value, obj, key, options, type }: TransformFnParams) => {
    console.log(obj, key, options, type);

    if (!isArray(value)) return [];

    if (value.filter((item) => !isString(item)).length) return [];

    const arr = value as string[];

    const uniquesValue: string[] = [];

    arr.map((item) => {
      if (!uniquesValue.includes(item.trim())) uniquesValue.push(item.trim());
    });

    return uniquesValue;
  })
  autoKeywords: string[];

  @IsNumber()
  priority: number;

  @IsBoolean()
  favorite;
}
