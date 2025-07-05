import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Query,
  Get,
  Delete,
} from '@nestjs/common';
import { ProductReferenceService } from '../services';
import {
  CreateProductReferenceDto,
  QueryProductReferencesDto,
  UpdateProductReferenceDto,
} from '../dto';
import { Auth } from 'src/user-features/auth/decorators';

@Controller('product-reference')
export class ProductReferenceController {
  constructor(
    private readonly productReferenceService: ProductReferenceService,
  ) {}

  @Post()
  @Auth()
  async create(@Body() createProductReferenceDto: CreateProductReferenceDto) {
    const productReference = await this.productReferenceService.create(
      createProductReferenceDto,
    );

    return { data: productReference };
  }

  @Get()
  @Auth()
  async findAll(@Query() queryProductReferencesDto: QueryProductReferencesDto) {
    const productReferences = await this.productReferenceService.findAll(
      queryProductReferencesDto,
    );

    return { data: productReferences };
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string) {
    const productReference = await this.productReferenceService.findOne(id);

    return { data: productReference };
  }

  @Patch(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() updateProductReferenceDto: UpdateProductReferenceDto,
  ) {
    const productReference = await this.productReferenceService.update(
      id,
      updateProductReferenceDto,
    );

    return { data: productReference };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.productReferenceService.remove(id);

    return { data: result };
  }

  @Get('posible-parents/:productId')
  @Auth()
  async posibleParents(@Param('productId') productId: string) {
    const productPosibleParents =
      await this.productReferenceService.getPosibleProductParents(productId);

    return { data: productPosibleParents };
  }
}
