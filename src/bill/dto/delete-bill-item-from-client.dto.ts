import { OmitType } from '@nestjs/mapped-types';
import { DeleteBillItemDto } from './delete-bill-item.dto';

export class DeleteBillItemFromClientDto extends OmitType(DeleteBillItemDto, [
  'createdBy',
]) {}
