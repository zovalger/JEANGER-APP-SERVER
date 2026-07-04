import { IsIn, IsNumberString, IsString } from 'class-validator';

export class VenezuelanQueryDto {
  @IsString()
  @IsIn(['V', 'E'])
  nationality: 'V' | 'E';

  @IsString()
  @IsNumberString()
  CI: string;
}
