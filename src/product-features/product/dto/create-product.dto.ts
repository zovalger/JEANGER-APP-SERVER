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
import {
  keywordsNormalizeHelper,
  strToUniqueWordArrayHelper,
} from '../helpers';

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
  keywords: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ obj }: TransformFnParams) => {
    const name = obj?.name;

    if (typeof name !== 'string') return;

    return strToUniqueWordArrayHelper(name);
  })
  autoKeywords: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ obj }: TransformFnParams) => {
    if (typeof obj !== 'object') return;

    const keywords: string[] = obj?.keywords;

    const autoKeywords =
      typeof obj?.name === 'string'
        ? strToUniqueWordArrayHelper(obj.name)
        : null;

    if (!(keywords instanceof Array) || !(autoKeywords instanceof Array))
      return;

    const toSet: string[] = [...keywords];

    autoKeywords.map((word) => {
      const normilizeWord = keywordsNormalizeHelper(word);
      if (!toSet.includes(normilizeWord)) toSet.push(normilizeWord);
    });

    return toSet;
  })
  allKeywords: string[];

  @IsNumber()
  priority: number;

  @IsBoolean()
  favorite;
}
