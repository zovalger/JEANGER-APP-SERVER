import { OmitType } from '@nestjs/mapped-types';
import { CreateStopwatchDto } from './create-stopwatch.dto';

export class CreateStopwatchFromClientDto extends OmitType(CreateStopwatchDto, [
  'createdBy',
]) {}
