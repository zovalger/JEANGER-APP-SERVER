import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateProductReferenceDto,
  QueryProductReferencesDto,
  UpdateProductReferenceDto,
} from '../dto';
import { ProductDocument, ProductReference } from '../models';
import mongoose, { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import { ForeignExchangeService } from 'src/foreign-exchange/foreign-exchange.service';
import { CurrencyType } from 'src/common/enums/currency-type.enum';

@Injectable()
export class ProductReferenceService {
  constructor(
    private readonly productService: ProductService,
    private readonly foreignExchangeService: ForeignExchangeService,

    @InjectModel(ProductReference.name)
    private readonly productReferenceModel: Model<ProductReference>,
  ) {}

  async create(createProductReferenceDto: CreateProductReferenceDto) {
    const { parentId, childId } = createProductReferenceDto;

    const oldReference = await this.productReferenceModel.findOne({
      parentId,
      childId,
    });

    // si existe se actualiza
    if (oldReference)
      return await this.update(
        oldReference._id.toString(),
        createProductReferenceDto,
      );

    const productReference = new this.productReferenceModel(
      createProductReferenceDto,
    );

    await productReference.save();

    await this.updateProductReferences_Recursive_service(childId);

    return productReference;
  }

  // ****************************************************************************
  // 										              obtener
  // ****************************************************************************

  findOne = async (id: string) => {
    const productReference = await this.productReferenceModel.findById(id);

    if (!productReference)
      throw new BadRequestException(
        Messages.error.notFound(ModuleItems.productReference),
      );

    return productReference;
  };

  findAll = async (queryProductReferencesDto: QueryProductReferencesDto) => {
    const productsReferences = await this.productReferenceModel
      .find(queryProductReferencesDto)
      .sort({ name: 1 });

    return productsReferences;
  };

  getPosibleProductParents = async (childId: string) => {
    const curretParents = await this.findAll({ childId });

    const noId = [
      childId,
      ...curretParents.map((v) => this.getIdOfObject(v.parentId)),
    ];

    for (let index = 1; index < noId.length; index++) {
      const p = noId[index];

      const afterParent = await this.productReferenceModel.find({
        childId: p,
      });

      afterParent.forEach((pr) => {
        const found = noId.find(
          (id) => id.toString() === this.getIdOfObject(pr.parentId),
        );

        if (!found) noId.push(this.getIdOfObject(pr.parentId));
      });
    }

    const toParents = await this.productService.findAllExcept(noId);

    return toParents.map((v) => v._id);
  };

  // ****************************************************************************
  // 										              actualizar
  // ****************************************************************************

  // actualizar una sola referencia
  update = async (
    id: string,
    updateProductReferenceDto: UpdateProductReferenceDto,
  ) => {
    const productReference = await this.productReferenceModel.findByIdAndUpdate(
      id,
      updateProductReferenceDto,
      { new: true },
    );

    if (!productReference)
      throw new BadRequestException(
        Messages.error.notFound(ModuleItems.productReference),
      );

    await this.updateProductReferences_Recursive_service(
      this.getIdOfObject(productReference.childId),
    );

    return productReference;
  };

  // actualizar todas las referencias donde el padre sea el parentid
  // updateProductReferences_By_Parent_recursive_service = async (
  //   data: Partial<ProductReference>,
  // ) => {
  //   const { parentId, cost, currencyType } = data;

  //   await this.productReferenceModel.findOneAndUpdate(
  //     { parentId },
  //     { cost, currencyType },
  //   );

  //   return await this.productReferenceModel.find({ parentId });
  // };

  // actualizar todas las referencias donde sea un hijo
  // updateProductReferences_By_Child_service = async (data: ProductReference) => {
  //   const { childId, cost, currencyType, percentage, amount } = data;

  //   await this.productReferenceModel.findOneAndUpdate(
  //     { childId },
  //     { cost, currencyType, percentage, amount },
  //   );

  //   return await this.productReferenceModel.find({ childId });
  // };

  // ****************************************************************************
  // 										              eliminar
  // ****************************************************************************

  // async deleteProductReference_service(_id: string) {
  //   const result = await this.productReferenceModel.deleteOne({ _id });

  //   await this.updateProductReferences_Recursive_service(_id);

  //   return !!result.deletedCount;
  // }

  async remove(id: string, recursive = true) {
    const ref = await this.findOne(id);

    await this.productReferenceModel.deleteOne({
      id,
    });

    const childId = this.getIdOfObject(ref.childId);

    if (recursive)
      await this.updateProductReferences_Recursive_service(childId);

    return true;
  }

  // ****************************************************************************
  // 										        actualizar hijos
  // ****************************************************************************

  // actualizar las referencias hijas
  updateProductReferences_Recursive_service = async (productId: string) => {
    console.log('actualizador recursivo');

    const cost = await this.getCost_by_References_service(productId);

    await this.productService.update(productId, { cost });

    const childsReferences = await this.findAll({
      parentId: productId,
    });

    for (const reference of childsReferences) {
      const childId = this.getIdOfObject(reference.childId);

      await this.updateProductReferences_Recursive_service(childId);
    }
  };

  // devuelve el monto en dolares
  private async getCost_by_References_service(productId: string) {
    const product = await this.productService.findOne(productId);
    const foreignExchange = await this.foreignExchangeService.last();

    const productReferences = await this.productReferenceModel
      .find({
        childId: productId,
      })
      .populate<{ parentId: ProductDocument }>('parentId');

    if (!foreignExchange) return 0;
    if (!productReferences.length) return 0;

    const costInDolar = productReferences.reduce(
      (total: number, reference: ProductReference) => {
        const { parentId, amount, percentage } = reference;

        if (parentId instanceof mongoose.Types.ObjectId)
          throw new InternalServerErrorException('parentId is not populated');

        const { cost, currencyType } = parentId;

        let toSum = cost * percentage * amount;

        if (currencyType == CurrencyType.EUR)
          toSum = (toSum * foreignExchange.euro) / foreignExchange.dolar;

        if (currencyType == CurrencyType.BSF)
          toSum = toSum / foreignExchange.dolar;

        return total + toSum;
      },
      0,
    );

    const costInCurrencyType =
      product.currencyType == CurrencyType.EUR
        ? (costInDolar * foreignExchange.dolar) / foreignExchange.euro
        : product.currencyType == CurrencyType.BSF
          ? costInDolar * foreignExchange.dolar
          : costInDolar;

    return costInCurrencyType;
  }

  private getIdOfObject(obj: unknown): string {
    let id: string | null = null;

    if (obj instanceof mongoose.Types.ObjectId) id = obj.toString();

    if (typeof obj === 'object' && obj !== null && '_id' in obj)
      id =
        obj._id instanceof mongoose.Types.ObjectId
          ? obj._id.toString()
          : typeof obj._id === 'string'
            ? obj._id
            : null;

    if (!id) throw new InternalServerErrorException('no id');

    return id;
  }
}
