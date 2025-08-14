import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSetting } from './models';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import { CreateProductSettingDto, UpdateProductSettingDto } from './dto';
import { SystemRequirementsDto } from 'src/common/dto/system-requirements.dto';

@Injectable()
export class ProductSettingService {
  constructor(
    @InjectModel(ProductSetting.name)
    private readonly productSettingModel: Model<ProductSetting>,
  ) {}

  async create(
    createProductSettingDto: CreateProductSettingDto,
    systemRequirementsDto: SystemRequirementsDto,
  ) {
    const { userId } = systemRequirementsDto;
    if (!userId) throw new InternalServerErrorException('no user');

    const productSetting = new this.productSettingModel({
      ...createProductSettingDto,
      createdBy: userId,
    });

    await productSetting.save();

    return productSetting;
  }

  async findOne(id: string, systemRequirementsDto: SystemRequirementsDto) {
    const { userId } = systemRequirementsDto;
    if (!userId) throw new InternalServerErrorException('no user');

    // todo: filtrar por empresa (cuando aplique)
    const productSetting = await this.productSettingModel.findOne();

    if (!productSetting)
      throw new NotFoundException(
        Messages.error.notFound(ModuleItems.productSetting),
      );

    return productSetting;
  }

  async update(
    id: string,
    updateProductSettingDto: UpdateProductSettingDto,
    systemRequirementsDto: SystemRequirementsDto,
  ) {
    const { userId } = systemRequirementsDto;
    if (!userId) throw new InternalServerErrorException('no user');

    await this.findOne(id, systemRequirementsDto);

    const productSetting = await this.productSettingModel.findByIdAndUpdate(
      id,
      updateProductSettingDto,
      { new: true },
    );

    return productSetting;
  }
}
