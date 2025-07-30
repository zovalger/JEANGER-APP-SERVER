import { PartialType, PickType } from '@nestjs/mapped-types';
import { UpdateBillDto } from './update-bill.dto';

export class BasicUpdateBill_bySocket_Dto extends PartialType(
  PickType(UpdateBillDto, ['name']),
) {
  _id: string;
  tempId?: string;
}
