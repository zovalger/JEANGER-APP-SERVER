import { IsDateString, IsMongoId } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { UpdateStopwatchDto } from './update-stopwatch.dto';

export class UpdateStopwatchFromSocketDto extends OmitType(UpdateStopwatchDto, [
  'updatedAt',
]) {
  @IsMongoId()
  _id: string;

  @IsDateString()
  updatedAt: string;
}
