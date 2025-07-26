import { OmitType } from '@nestjs/mapped-types';
import { SetBillItemDto } from './set-bill-item.dto';

export class SetBillItemFromClientDto extends OmitType(SetBillItemDto, [
  'createdBy',
]) {}
