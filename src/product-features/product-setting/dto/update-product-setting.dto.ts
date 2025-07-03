import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSettingDto } from './create-product-setting.dto';

export class UpdateProductSettingDto extends PartialType(CreateProductSettingDto) {}
