import { IsDate, IsNumber, IsPositive } from 'class-validator';

export class CreateForeignExchangeDto {
  @IsNumber()
  @IsPositive()
  dolar: number;

  @IsNumber()
  @IsPositive()
  euro: number;

  @IsDate()
  bankBusinessDate: Date;
}
