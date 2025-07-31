import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSetting } from './models';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import { CreateProductSettingDto, UpdateProductSettingDto } from './dto';

@Injectable()
export class ProductSettingService {
  constructor(
    @InjectModel(ProductSetting.name)
    private readonly productSettingModel: Model<ProductSetting>,
  ) {}

  async create(createProductSettingDto: CreateProductSettingDto) {
    const productSetting = new this.productSettingModel(
      createProductSettingDto,
    );

    await productSetting.save();

    return productSetting;
  }

  async findOne() {
    const productSetting = await this.productSettingModel.findOne();

    if (!productSetting)
      throw new NotFoundException(
        Messages.error.notFound(ModuleItems.productSetting),
      );

    return productSetting;
  }

  async update(id: string, updateProductSettingDto: UpdateProductSettingDto) {
    await this.findOne();

    const stopwatch = await this.productSettingModel.findByIdAndUpdate(
      id,
      updateProductSettingDto,
      { new: true },
    );

    return stopwatch;
  }
}
