import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductReferenceDto, UpdateProductReferenceDto } from '../dto';
import { ProductDocument, ProductReference } from '../models';
import { Model } from 'mongoose';
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
      return await this.updateProductReference_service(
        oldReference._id.toString(),
        createProductReferenceDto,
      );

    // sino se crea
    const product = await this.productService.findOne(parentId);

    const { cost, currencyType } = product;

    const productReference = new this.productReferenceModel({
      ...createProductReferenceDto,
      cost,
      currencyType,
    });

    await productReference.save();

    await this.updateProductReferences_Recursive_service(
      productReference.childId.toString(),
    );

    return productReference;
  }

  // ****************************************************************************
  // 										              obtener
  // ****************************************************************************

  findAll = async () => {
    const productsReferences = await this.productReferenceModel.find();

    return productsReferences;
  };

  findOne = async (id: string) => {
    const productReference = await this.productReferenceModel.findById(id);

    if (!productReference)
      throw new BadRequestException(
        Messages.error.notFound(ModuleItems.productReference),
      );

    return productReference;
  };

  getProductReference_by_ParentId_service = async (parentId: string) => {
    const productReference = await this.productReferenceModel.find({
      parentId,
    });

    if (!productReference)
      throw new BadRequestException(
        Messages.error.notFound(ModuleItems.productReference),
      );

    return productReference;
  };

  getProductReference_by_ChildId_service = async (childId: string) => {
    const productReference = await this.productReferenceModel.find({ childId });

    if (!productReference)
      throw new BadRequestException(
        Messages.error.notFound(ModuleItems.productReference),
      );

    return productReference;
  };

  getPosibleProductParents_By_ProductId_service = async (childId: string) => {
    const curretParents = await this.productReferenceModel.find({ childId });

    const noId = [childId, ...curretParents.map((v) => v.parentId.toString())];

    for (let index = 1; index < noId.length; index++) {
      const p = noId[index];

      const afterParent = await this.productReferenceModel.find({
        childId: p,
      });

      afterParent.forEach((pr) => {
        const found = noId.find(
          (id) => id.toString() === pr.parentId.toString(),
        );

        if (!found) noId.push(pr.parentId.toString());
      });
    }

    const toParents = await this.productService.findAllExcept(noId);

    return toParents.map((v) => v._id) || undefined;
  };

  // devuelve el monto en dolares
  getCost_by_References_service = async ({
    _id: productId,
    currencyType: currencyTypeProd,
  }: ProductDocument) => {
    const foreignExchange = await this.foreignExchangeService.last();

    const productReferences = await this.getProductReference_by_ChildId_service(
      productId.toString(),
    );

    if (!foreignExchange) return 0;
    if (!productReferences) return 0;

    const costInDolar = productReferences.reduce(
      (total: number, reference: ProductReference) => {
        const { cost, currencyType, amount, percentage } = reference;

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
      currencyTypeProd == CurrencyType.EUR
        ? (costInDolar * foreignExchange.dolar) / foreignExchange.euro
        : currencyTypeProd == CurrencyType.BSF
          ? costInDolar * foreignExchange.dolar
          : costInDolar;

    return costInCurrencyType;
  };

  // ****************************************************************************
  // 										              eliminar
  // ****************************************************************************

  deleteProductReference_service = async (_id: string) => {
    const result = await this.productReferenceModel.deleteOne({ _id });

    await this.updateProductReferences_Recursive_service(_id);

    return !!result.deletedCount;
  };

  deleteProductReference_by_ProductsId_service = async (
    parentId: string,
    childId: string,
  ) => {
    const result = await this.productReferenceModel.deleteOne({
      parentId,
      childId,
    });

    await this.updateProductReferences_Recursive_service(childId);

    return !!result.deletedCount;
  };

  // ****************************************************************************
  // 										              actualizar
  // ****************************************************************************

  // actualizar una sola referencia
  updateProductReference_service = async (
    id: string,
    data: UpdateProductReferenceDto,
  ) => {
    const { percentage, amount, parentId, childId } = data;

    const productReference = await this.findOne(id);

    if (parentId) {
      const product = await this.productService.findOne(parentId.toString());
      const { cost, currencyType } = product;

      productReference.currencyType = currencyType;
      productReference.cost = cost;
    }

    if (amount) productReference.amount = amount;
    if (percentage) productReference.percentage = percentage;

    await productReference.save();

    await this.updateProductReferences_Recursive_service(
      productReference.childId.toString(),
    );

    return productReference;
  };

  // actualizar todas las referencias donde el padre sea el parentid
  updateProductReferences_By_Parent_service = async (
    data: Partial<ProductReference>,
  ) => {
    const { parentId, cost, currencyType } = data;

    await this.productReferenceModel.findOneAndUpdate(
      { parentId },
      { cost, currencyType },
    );

    return await this.productReferenceModel.find({ parentId });
  };

  // actualizar todas las referencias donde el padre sea el parentid
  updateProductReferences_By_Parent_recursive_service = async (
    data: Partial<ProductReference>,
  ) => {
    const { parentId, cost, currencyType } = data;

    await this.productReferenceModel.findOneAndUpdate(
      { parentId },
      { cost, currencyType },
    );

    return await this.productReferenceModel.find({ parentId });
  };

  // actualizar todas las referencias donde sea un hijo
  updateProductReferences_By_Child_service = async (data: ProductReference) => {
    const { childId, cost, currencyType, percentage, amount } = data;

    await this.productReferenceModel.findOneAndUpdate(
      { childId },
      { cost, currencyType, percentage, amount },
    );

    return await this.productReferenceModel.find({ childId });
  };

  // ****************************************************************************
  // 										        actualizar hijos
  // ****************************************************************************

  // actualizar las referencias hijas
  updateProductReferences_Recursive_service = async (productId: string) => {
    console.log('actualizador recursivo');

    const product =
      await this.productService.updateCost_by_References(productId);

    if (!product) return;

    const childsReferences =
      await this.updateProductReferences_By_Parent_service({
        parentId: product._id,
        cost: product.cost,
        currencyType: product.currencyType,
      });

    if (!childsReferences) return;

    for (const r of childsReferences) {
      await this.updateProductReferences_Recursive_service(
        r.childId.toString(),
      );
    }

    return;
  };
}
