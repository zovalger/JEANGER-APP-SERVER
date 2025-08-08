import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateStopwatchDto {
  @IsUUID()
  tempId: string;

  @IsString()
  name: string;

  @IsOptional()
  @Transform(({ value }: TransformFnParams) => {
    console.log(value);
    return typeof value == 'number' ? value : null;
  })
  timeDate: number | null;

  @IsNumber()
  accumulatedTime: number;

  @IsOptional()
  @Transform(({ value }: TransformFnParams) => {
    console.log(value);
    return typeof value == 'number' ? value : null;
  })
  timeSeted: number | null;

  @IsMongoId()
  createdBy: string;

  @IsDateString()
  createdAt: string;

  @IsOptional()
  @IsDateString()
  updatedAt: string;
}
