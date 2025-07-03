import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductReferenceService } from './product-reference.service';
import { CreateProductReferenceDto } from './dto/create-product-reference.dto';
import { UpdateProductReferenceDto } from './dto/update-product-reference.dto';

@Controller('product-reference')
export class ProductReferenceController {
  constructor(private readonly productReferenceService: ProductReferenceService) {}

  @Post()
  create(@Body() createProductReferenceDto: CreateProductReferenceDto) {
    return this.productReferenceService.create(createProductReferenceDto);
  }

  @Get()
  findAll() {
    return this.productReferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productReferenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductReferenceDto: UpdateProductReferenceDto) {
    return this.productReferenceService.update(+id, updateProductReferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productReferenceService.remove(+id);
  }
}
