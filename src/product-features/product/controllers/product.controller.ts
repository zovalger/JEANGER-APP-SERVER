import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductFromClientDto } from '../dto/update-product-from-client.dto';
import { Auth, GetUser } from 'src/user-features/auth/decorators';
import { UserDocument } from 'src/user-features/user/models/user.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth()
  async create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: UserDocument,
  ) {
    const product = await this.productService.create(createProductDto, {
      userId: user._id.toString(),
    });
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
    @Body() updateProductDto: UpdateProductFromClientDto,
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
