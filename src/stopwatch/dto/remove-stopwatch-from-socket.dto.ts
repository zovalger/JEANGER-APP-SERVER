import { IsMongoId } from 'class-validator';
import { RemoveStopwatchDto } from './remove-stopwatch.dto';

export class RemoveStopwatchFromSocketDto extends RemoveStopwatchDto {
  @IsMongoId()
  _id: string;
}
