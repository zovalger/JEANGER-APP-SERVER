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
  async create(@Body() createProductReferenceDto: CreateProductReferenceDto) {
    const productReference = await this.productReferenceService.create(
      createProductReferenceDto,
    );

    return { data: productReference };
  }

  async findAll(@Query() queryProductReferencesDto: QueryProductReferencesDto) {
    const productReferences = await this.productReferenceService.findAll(
      queryProductReferencesDto,
    );

    return { data: productReferences };
  }

  @Get()
  async posibleParents(@Param('id') id: string) {
    const productPosibleParents =
      await this.productReferenceService.getPosibleProductParents(id);

    return { data: productPosibleParents };
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

  // ****************************************************************************
  // 										              eliminar
  // ****************************************************************************

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.productReferenceService.remove(id);

    return { data: result };
  }
}
