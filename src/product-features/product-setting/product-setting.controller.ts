import {
  Controller,
  // Get, Post, Body, Patch, Param, Delete
} from '@nestjs/common';
import { ProductSettingService } from './product-setting.service';
// import { CreateProductSettingDto } from './dto/create-product-setting.dto';
// import { UpdateProductSettingDto } from './dto/update-product-setting.dto';

@Controller('product-setting')
export class ProductSettingController {
  constructor(private readonly productSettingService: ProductSettingService) {}

  // @Post()
  // create(@Body() createProductSettingDto: CreateProductSettingDto) {
  //   return this.productSettingService.create(createProductSettingDto);
  // }

  // @Get()
  // findAll() {
  //   return this.productSettingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productSettingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductSettingDto: UpdateProductSettingDto) {
  //   return this.productSettingService.update(+id, updateProductSettingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productSettingService.remove(+id);
  // }
}
