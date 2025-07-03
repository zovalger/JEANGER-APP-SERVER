import { IsDateString, IsNumber, IsPositive } from 'class-validator';

export class CreateForeignExchangeDto {
  @IsNumber()
  @IsPositive()
  dolar: number;

  @IsNumber()
  @IsPositive()
  euro: number;

  @IsDateString()
  bankBusinessDate: string;
}
