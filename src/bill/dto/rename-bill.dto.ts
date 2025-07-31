import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RenameBillDto {
  @IsMongoId()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
