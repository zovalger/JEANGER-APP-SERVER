import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { Product } from '../models';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);

    await product.save();

    return product;
  }

  async findAll() {
    const products = await this.productModel.find().sort({ name: 1 });

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

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    // todo: actualizar referencias
    // await updateProductReferences_Recursive_service(product._id);

    // await product.save();

    return product;
  }

  async updateCost_by_References(productId: string) {
    const product = await this.findOne(productId);

    // todo: obtener costos por referencias
    // product.cost =
    //   (await getCost_by_References_service(product)) || product.cost;

    await product.save();

    return product;
  }

  async remove(id: string) {
    // todo: ver si hay referencias
    // const childs = await getProductReference_by_ParentId_service(_id);
    // if (childs && childs.length) return;
    // const result = await ProductModel.deleteOne({ _id });
    // return !!result.deletedCount;
  }
}
