import { OmitType } from '@nestjs/mapped-types';
import { CreateStopwatchDto } from './create-stopwatch.dto';

export class CreateStopwatchFromSocketDto extends OmitType(CreateStopwatchDto, [
  'createdBy',
]) {}
