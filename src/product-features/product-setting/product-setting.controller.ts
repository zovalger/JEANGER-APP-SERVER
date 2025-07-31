import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProductSettingService } from './product-setting.service';
import { CreateProductSettingDto, UpdateProductSettingDto } from './dto';
import { Auth } from 'src/user-features/auth/decorators';

@Controller('product-setting')
export class ProductSettingController {
  constructor(private readonly productSettingService: ProductSettingService) {}

  @Post()
  @Auth()
  create(@Body() createProductSettingDto: CreateProductSettingDto) {
    return this.productSettingService.create(createProductSettingDto);
  }

  @Get()
  @Auth()
  findOne() {
    return this.productSettingService.findOne();
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateProductSettingDto: UpdateProductSettingDto,
  ) {
    return this.productSettingService.update(id, updateProductSettingDto);
  }
}
