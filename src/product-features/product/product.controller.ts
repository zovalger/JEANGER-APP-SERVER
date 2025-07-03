import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './services/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/user-features/auth/decorators';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return { data: product };
  }

  @Get()
  @Auth()
  async findAll() {
    const products = await this.productService.findAll();
    return { data: products };
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return { data: product };
  }

  @Patch(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(id, updateProductDto);
    return { data: product };
  }

  @Delete(':id')
  @Auth()
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(id);
    return { data: product };
  }
}
