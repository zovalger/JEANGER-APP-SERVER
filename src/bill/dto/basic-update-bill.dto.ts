import { PartialType, PickType } from '@nestjs/mapped-types';
import { UpdateBillDto } from './update-bill.dto';

export class BasicUpdateBillDto extends PartialType(
  PickType(UpdateBillDto, ['name']),
) {}
