import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import {
  CreateProductDto,
  QueryProductsDto,
  UpdateProductDto,
  UpdateProductFromClientDto,
} from '../dto';
import { Product, ProductDocument } from '../models';
import { ProductReferenceService } from './product-reference.service';
import { strToUniqueWordArrayHelper } from '../helpers';
import { SystemRequirementsDto } from 'src/common/dto/system-requirements.dto';
import { uniqueValuesArrayHelper } from 'src/common/helpers';

@Injectable()
export class ProductService {
  constructor(
    @Inject(forwardRef(() => ProductReferenceService))
    private readonly productReferenceService: ProductReferenceService,

    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    systemRequirementsDto: SystemRequirementsDto,
  ) {
    const { userId } = systemRequirementsDto;

    const product = new this.productModel({
      ...createProductDto,
      createdBy: userId,
    });

    await product.save();

    return product;
  }

  async findAll(queryProductsDto: QueryProductsDto = {}) {
    const filteredQuery = Object.fromEntries(
      Object.entries(queryProductsDto).filter((a) => a[1] !== undefined),
    );

    const f = filteredQuery._id
      ? { ...filteredQuery, _id: { $in: filteredQuery._id } }
      : filteredQuery;

    const promise = this.productModel.find(f).sort({ name: 1 });

    return await promise;
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
    updateProductDto: UpdateProductFromClientDto,
    updateFromReferences = false,
  ) {
    const rest = { ...updateProductDto, cost: undefined };

    let toUpdate = updateProductDto;

    if (!updateFromReferences) {
      const hasParents =
        await this.productReferenceService.hasParentReferences(id);

      if (hasParents) toUpdate = rest;
    }

    const productOldVersion = await this.findOne(id);

    toUpdate = this.updateKeywords(productOldVersion, toUpdate);

    toUpdate = await this.updateCostByCurrencyType(productOldVersion, toUpdate);

    const product = (await this.productModel.findByIdAndUpdate(id, toUpdate, {
      new: true,
    })) as ProductDocument;

    await this.updateChildrenDecision(
      id,
      updateProductDto,
      updateFromReferences,
    );

    return product;
  }

  private updateKeywords(
    product: ProductDocument,
    updateProductDto: UpdateProductDto,
  ): UpdateProductDto {
    const { keywords, name } = updateProductDto;

    if (!keywords && !name) return updateProductDto;

    const newData = { ...updateProductDto };

    let newAll: string[] = [];

    if (name && product.name !== name) {
      const arr = strToUniqueWordArrayHelper(name);
      newData.autoKeywords = arr;
      newAll = [...newAll, ...arr];
    } else {
      newAll = [...product.autoKeywords];
    }

    const keywordsStr = keywords?.join() || null;
    const currentKeywordsStr = product.keywords.join();

    if (
      keywords &&
      keywordsStr !== null &&
      keywordsStr !== currentKeywordsStr
    ) {
      newData.keywords = keywords;
      newAll = [...newAll, ...keywords];
    } else {
      newAll = [...newAll, ...product.keywords];
    }

    newData.allKeywords = uniqueValuesArrayHelper(newAll);

    return newData;
  }

  // todo: mejorar esta funcionalidad para que no hayan tantas consultas
  private async updateCostByCurrencyType(
    product: ProductDocument,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateProductDto> {
    if (!updateProductDto.currencyType) return updateProductDto;

    const has = await this.productReferenceService.hasParentReferences(
      product._id.toString(),
    );

    if (!has) return updateProductDto;

    product.currencyType = updateProductDto.currencyType;

    const cost =
      await this.productReferenceService.getCost_by_References(product);

    const newData = { ...updateProductDto, cost };

    return newData;
  }

  private async updateChildrenDecision(
    id: string,
    updateProductDto: UpdateProductDto,
    updateFromReferences = false,
  ) {
    const { cost, currencyType } = updateProductDto;

    if (updateFromReferences) return;

    if (cost == undefined && !currencyType) return;

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
    const childs = await this.productReferenceService.findAll(
      { parentId: id },
      ['parentId'],
    );

    if (childs && childs.length) {
      const names = childs.map((item) =>
        item.parentId instanceof mongoose.Types.ObjectId
          ? item.parentId.toString()
          : item.parentId.name,
      );

      throw new BadRequestException(
        Messages.error.onDeleteProductHasChilds(names),
      );
    }

    const parents = await this.productReferenceService.findAll({ childId: id });

    for (const element of parents) {
      await this.productReferenceService.remove(element._id.toString(), false);
    }

    const result = await this.productModel.deleteOne({ _id: id });
    return !!result.deletedCount;
  }
}
