import { IsMongoId, IsString } from 'class-validator';

export class UpdateBillItemDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  // @IsString()
  // @IsMongoId()
  // foreignExchange: string;
}
