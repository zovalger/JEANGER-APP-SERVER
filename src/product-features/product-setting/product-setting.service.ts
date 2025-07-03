import { Injectable } from '@nestjs/common';
import { CreateProductSettingDto } from './dto/create-product-setting.dto';
import { UpdateProductSettingDto } from './dto/update-product-setting.dto';

@Injectable()
export class ProductSettingService {
  create(createProductSettingDto: CreateProductSettingDto) {
    return 'This action adds a new productSetting';
  }

  findAll() {
    return `This action returns all productSetting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productSetting`;
  }

  update(id: number, updateProductSettingDto: UpdateProductSettingDto) {
    return `This action updates a #${id} productSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} productSetting`;
  }
}
