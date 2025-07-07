import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { Product } from '../models';
import { ProductReferenceService } from './product-reference.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(forwardRef(() => ProductReferenceService))
    private readonly productReferenceService: ProductReferenceService,

    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto);

    const product = new this.productModel(createProductDto);

    await product.save();

    return product;
  }

  async findAll() {
    const products = await this.productModel.find().sort({ name: 1 });

    return products;
  }

  async findAllExcept(id: string[]) {
    const products = await this.productModel
      .find({ _id: { $nin: id } })
      .sort({ name: 1 });

    return products;
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);

    if (!product)
      throw new BadRequestException(
        Messages.error.notFound(ModuleItems.product),
      );

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    updateFromReferences = false,
  ) {
    const rest = { ...updateProductDto, cost: undefined };

    let toUpdate = updateProductDto;

    if (!updateFromReferences) {
      const hasParents =
        await this.productReferenceService.hasParentReferences(id);

      if (hasParents) toUpdate = rest;
    }

    const product = await this.productModel.findByIdAndUpdate(id, toUpdate, {
      new: true,
    });

    if (!product)
      throw new BadRequestException(
        Messages.error.notFound(ModuleItems.product),
      );

    await this.updateChildrenDecision(
      id,
      updateProductDto,
      updateFromReferences,
    );

    return product;
  }

  private async updateChildrenDecision(
    id: string,
    updateProductDto: UpdateProductDto,
    updateFromReferences = false,
  ) {
    const { cost } = updateProductDto;

    if (updateFromReferences) return;

    if (cost == undefined) return;

    const hasChilds =
      await this.productReferenceService.hasChildsReferences(id);

    if (!hasChilds) return;

    await this.productReferenceService.updateProductReferences_Recursive_service(
      id,
      { setSelfCost: false },
    );
  }

  // async updateCost_by_References(productId: string) {
  //   const product = await this.findOne(productId);

  //   // todo: obtener costos por referencias
  //   // product.cost =
  //   //   (await getCost_by_References_service(product)) || product.cost;

  //   await product.save();

  //   return product;
  // }

  async remove(id: string) {
    const childs = await this.productReferenceService.findAll({ parentId: id });

    if (childs && childs.length) return;

    const parents = await this.productReferenceService.findAll({ childId: id });

    for (const element of parents) {
      await this.productReferenceService.remove(element._id.toString(), false);
    }

    const result = await this.productModel.deleteOne({ _id: id });
    return !!result.deletedCount;
  }
}
