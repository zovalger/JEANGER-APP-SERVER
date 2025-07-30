import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStopwatchDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  timeDate: number | null;

  @IsNumber()
  accumulatedTime: number;

  @IsOptional()
  @IsNumber()
  timeSeted: number | null;

  @IsMongoId()
  createdBy: string;

  @IsDateString()
  createdAt: string;

  @IsOptional()
  @IsDateString()
  updatedAt: string;
}
