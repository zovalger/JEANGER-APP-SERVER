import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { ProductReferenceService } from '../services';
import { CreateProductReferenceDto, UpdateProductReferenceDto } from '../dto';
import { Auth } from 'src/user-features/auth/decorators';

@Controller('product-reference')
export class ProductReferenceController {
  constructor(
    private readonly productReferenceService: ProductReferenceService,
  ) {}

  @Post()
  async createProductReference_controller(
    @Body() createProductReferenceDto: CreateProductReferenceDto,
  ) {
    const productReference = await this.productReferenceService.create(
      createProductReferenceDto,
    );

    return { data: productReference };
  }
  // ****************************************************************************
  // 										              obtener
  // ****************************************************************************

  async getProductReference_By_ParentId_controller(
    @Param('parentId') parentId: string,
  ) {
    const productReference =
      await this.productReferenceService.getProductReference_by_ParentId_service(
        parentId,
      );

    return { data: productReference };
  }

  async getProductReference_By_ChildId_controller(@Param('id') id: string) {
    const productReference =
      await this.productReferenceService.getProductReference_by_ChildId_service(
        id,
      );

    return { data: productReference };
  }

  async getPosibleProductParents_By_ProductId_controller(
    @Param('id') id: string,
  ) {
    const productPosibleParents =
      await this.productReferenceService.getPosibleProductParents_By_ProductId_service(
        id,
      );

    return { data: productPosibleParents };
  }

  // ****************************************************************************
  // 										              actualizar
  // ****************************************************************************

  @Patch(':id')
  @Auth()
  async updateProductReference_controller(
    @Param('id') id: string,
    @Body() updateProductReferenceDto: UpdateProductReferenceDto,
  ) {
    const productReference =
      await this.productReferenceService.updateProductReference_service(
        id,
        updateProductReferenceDto,
      );

    return { data: productReference };
  }

  // ****************************************************************************
  // 										              eliminar
  // ****************************************************************************

  async deleteProductReference_controller(
    @Param('parentId') parentId: string,
    @Param('childId') childId: string,
  ) {
    const result =
      await this.productReferenceService.deleteProductReference_by_ProductsId_service(
        parentId,
        childId,
      );

    return { data: result };
  }
}
