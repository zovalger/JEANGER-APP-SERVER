import { IsMongoId } from 'class-validator';

export class CreateProductSettingDto {
  @IsMongoId()
  stopwatchProduct: string;
}
