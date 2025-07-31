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
