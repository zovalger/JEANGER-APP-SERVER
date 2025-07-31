import { IsDateString } from 'class-validator';

export class RemoveStopwatchDto {
  @IsDateString()
  updatedAt: string;
}
