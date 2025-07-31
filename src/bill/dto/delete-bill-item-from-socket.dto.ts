import { OmitType } from '@nestjs/mapped-types';
import { DeleteBillItemDto } from './delete-bill-item.dto';
import { IsMongoId } from 'class-validator';

export class DeleteBillItemFromSocketDto extends OmitType(DeleteBillItemDto, [
  'createdBy',
]) {
  @IsMongoId()
  billId: string;
}
