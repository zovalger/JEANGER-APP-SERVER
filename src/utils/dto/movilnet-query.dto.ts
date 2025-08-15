import { IsString } from 'class-validator';

export class MovilnetQueryDto {
  @IsString()
  phoneNumber: string;
}
