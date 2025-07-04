import { IsOptional } from 'class-validator';

export class QueryProductReferencesDto {
  @IsOptional()
  childId?: string;

  @IsOptional()
  parentId?: string;
}
