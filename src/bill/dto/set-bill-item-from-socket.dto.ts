import { OmitType } from '@nestjs/mapped-types';
import { SetBillItemDto } from './set-bill-item.dto';
import { IsMongoId } from 'class-validator';

export class SetBillItemFromSocketDto extends OmitType(SetBillItemDto, [
  'createdBy',
]) {
  @IsMongoId()
  billId: string;
}
