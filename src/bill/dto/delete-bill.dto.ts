import { IsDateString, IsMongoId } from 'class-validator';

export class DeleteBillDto {
  @IsMongoId()
  _id: string;

  @IsDateString()
  updatedAt: string;
}
