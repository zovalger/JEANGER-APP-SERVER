import { IsOptional, IsString } from 'class-validator';

export class QueryProductReferencesDto {
  @IsOptional()
  @IsString()
  childId?: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}
