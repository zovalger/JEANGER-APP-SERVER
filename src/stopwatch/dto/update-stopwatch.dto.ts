import { PartialType } from '@nestjs/mapped-types';
import { CreateStopwatchDto } from './create-stopwatch.dto';
import { IsDateString } from 'class-validator';

export class UpdateStopwatchDto extends PartialType(CreateStopwatchDto) {
  @IsDateString()
  updatedAt: string;
}
