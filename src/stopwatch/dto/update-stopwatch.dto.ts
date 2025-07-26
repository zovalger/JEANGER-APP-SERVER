import { PartialType } from '@nestjs/mapped-types';
import { CreateStopwatchDto } from './create-stopwatch.dto';

export class UpdateStopwatchDto extends PartialType(CreateStopwatchDto) {
  _id: string;
}
