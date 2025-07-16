import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateProductReferenceDto,
  QueryProductReferencesDto,
  UpdateProductReferenceDto,
} from '../dto';
import {
  ProductDocument,
  ProductReference,
  ProductReferenceDocument,
} from '../models';
import mongoose, { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import { ForeignExchangeService } from 'src/foreign-exchange/foreign-exchange.service';
import { CurrencyType } from 'src/common/enums/currency-type.enum';
import { SystemRequirementsDto } from 'src/common/dto/system-requirements.dto';
import Decimal from 'decimal.js';
import { uniqueValuesArrayHelper } from 'src/common/helpers';

@Injectable()
export class ProductReferenceService {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    private readonly foreignExchangeService: ForeignExchangeService,

    @InjectModel(ProductReference.name)
    private readonly productReferenceModel: Model<ProductReference>,
  ) {}

  async create(
    createProductReferenceDto: CreateProductReferenceDto,
    systemRequirementsDto: SystemRequirementsDto,
  ) {
    const { userId } = systemRequirementsDto;

    const { parentId, childId } = createProductReferenceDto;

    const isPosible = await this.isValidReference(parentId, childId);

    if (!isPosible)
      throw new BadRequestException(
        Messages.error.onCircularProductReference(),
      );

    const productReference = new this.productReferenceModel({
      ...createProductReferenceDto,
      createdBy: userId,
    });

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

  findAll = async (
    queryProductReferencesDto: QueryProductReferencesDto,
    populateFields?: (keyof ProductReferenceDocument)[],
  ) => {
    const filteredQuery = Object.fromEntries(
      Object.entries(queryProductReferencesDto).filter(
        (a) => a[1] !== undefined,
      ),
    );

    let query = this.productReferenceModel
      .find(filteredQuery)
      .sort({ name: 1 });

    // Si se especifican campos para el populate, se aplican
    if (populateFields && populateFields.length > 0) {
      populateFields.forEach((field) => {
        query = query.populate(field);
      });
    }

    const productsReferences = await query;

    return productsReferences;
  };

  // todo: hacer funcionar esto para que no hayan bucles de referencias
  async getPosibleProductParents(childId: string) {
    const s = await this.productReferenceModel.find({
      $or: [{ parentId: childId }, { childId }],
    });

    const c = s.map((v) => this.getIdOfObject(v.childId));
    const p = s.map((v) => this.getIdOfObject(v.parentId));

    const excludeIds = uniqueValuesArrayHelper([childId, ...c, ...p]);

    const getchildsRecursive = async (b: string[]): Promise<string[]> => {
      const aa: string[] = [...b];

      for (const element of b) {
        const childs = (
          await this.productReferenceModel.find({
            parentId: element,
          })
        ).map((v) => this.getIdOfObject(v.childId));

        aa.push(...childs, ...(await getchildsRecursive(childs)));
      }

      return uniqueValuesArrayHelper(aa);
    };

    const toParents = await this.productService.findAllExcept(
      await getchildsRecursive(excludeIds),
    );

    return toParents.map((v) => v._id.toString());
  }

  async isValidReference(parentId: string, childId: string): Promise<boolean> {
    return (await this.getPosibleProductParents(childId)).includes(parentId);
  }

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

    await ref.deleteOne();

    // await this.productReferenceModel.deleteOne({
    //   _id: id,
    // });

    const childId = this.getIdOfObject(ref.childId);

    if (recursive)
      await this.updateProductReferences_Recursive_service(childId);

    return true;
  }

  // ****************************************************************************
  // 										        actualizar hijos
  // ****************************************************************************

  async hasParentReferences(productId: string) {
    const c = await this.productReferenceModel.countDocuments({
      childId: productId,
    });

    return !!c;
  }

  async hasChildsReferences(productId: string) {
    const c = await this.productReferenceModel.countDocuments({
      parentId: productId,
    });

    return !!c;
  }

  // actualizar las referencias hijas
  updateProductReferences_Recursive_service = async (
    productId: string,
    options = { setSelfCost: true },
  ) => {
    const { setSelfCost } = options;

    if (setSelfCost) {
      const cost = await this.getCost_by_References(productId);

      await this.productService.update(productId, { cost }, true);
    }

    const childsReferences = await this.findAll({
      parentId: productId,
    });

    for (const reference of childsReferences) {
      const childId = this.getIdOfObject(reference.childId);

      await this.updateProductReferences_Recursive_service(childId);
    }
  };

  // devuelve el monto en dolares
  async getCost_by_References(
    productId: string | ProductDocument,
  ): Promise<number> {
    const product =
      typeof productId == 'string'
        ? await this.productService.findOne(productId)
        : productId;

    const foreignExchange = await this.foreignExchangeService.last();

    const productReferences = await this.productReferenceModel
      .find({
        childId: product._id,
      })
      .populate<{ parentId: ProductDocument }>('parentId');

    if (!foreignExchange) return 0;
    if (!productReferences.length) return 0;

    const costInDolar = productReferences.reduce(
      (total: Decimal, reference: ProductReference) => {
        const { parentId, amount, percentage } = reference;

        if (parentId instanceof mongoose.Types.ObjectId)
          throw new InternalServerErrorException('parentId is not populated');

        const { cost, currencyType } = parentId;

        let toSum = new Decimal(cost).mul(percentage).mul(amount);

        if (currencyType == CurrencyType.EUR)
          toSum = new Decimal(toSum)
            .mul(foreignExchange.euro)
            .div(foreignExchange.dolar);

        if (currencyType == CurrencyType.BSF)
          toSum = new Decimal(toSum).div(foreignExchange.dolar);

        return new Decimal(total).add(toSum);
      },
      new Decimal(0),
    );

    const costInCurrencyType =
      product.currencyType == CurrencyType.EUR
        ? costInDolar.mul(foreignExchange.dolar).div(foreignExchange.euro)
        : product.currencyType == CurrencyType.BSF
          ? costInDolar.mul(foreignExchange.dolar)
          : costInDolar;

    return costInCurrencyType.toNumber();
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
