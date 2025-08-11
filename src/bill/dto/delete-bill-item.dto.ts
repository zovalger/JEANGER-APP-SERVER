import { PickType } from '@nestjs/mapped-types';
import { SetBillItemDto } from './set-bill-item.dto';

export class DeleteBillItemDto extends PickType(SetBillItemDto, [
  'productId',
  'createdBy',
  'updatedAt',
]) {}
