import { IsArray, IsMongoId, IsOptional } from 'class-validator';

export class QueryProductsDto {
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  _id?: string[];
}
