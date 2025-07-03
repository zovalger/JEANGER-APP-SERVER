import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateForeignExchangeDto } from './dto/create-foreign-exchange.dto';
import { UpdateForeignExchangeDto } from './dto/update-foreign-exchange.dto';
import BCV_ForeignExchange from './helper/BCV_ForeignExchange';
import { InjectModel } from '@nestjs/mongoose';
import {
  ForeignExchange,
  ForeignExchangeModel,
} from './models/foreign-exchange.model';
import { Model } from 'mongoose';
import { Messages, ModuleItems } from 'src/common/providers/Messages';

@Injectable()
export class ForeignExchangeService {
  constructor(
    @InjectModel(ForeignExchangeModel.name)
    private readonly foreignExchangeModel: Model<ForeignExchange>,
  ) {}

  async webScraping() {
    const createForeignExchangeDto = await BCV_ForeignExchange();
    // todo: crear una forma de no sobrecargar el servidor si ya se esta haciendo un scraping
    return await this.create(createForeignExchangeDto);
  }

  async create(
    createForeignExchangeDto: CreateForeignExchangeDto,
    userId?: string,
  ) {
    const foreignExchange = new this.foreignExchangeModel({
      ...createForeignExchangeDto,
      createdBy: userId,
    });

    await foreignExchange.save();

    return foreignExchange;
  }

  async findAll() {
    return await this.foreignExchangeModel.find().sort({ createdAt: -1 });
  }

  async last() {
    return await this.foreignExchangeModel.findOne().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const foreignExchange = await this.foreignExchangeModel.findOne({
      _id: id,
    });

    if (!foreignExchange)
      throw new BadRequestException(
        Messages.error.notFound(ModuleItems.foreignExchange),
      );

    return foreignExchange;
  }

  async update(id: string, updateForeignExchangeDto: UpdateForeignExchangeDto) {
    const foreignExchange = await this.foreignExchangeModel.findOneAndUpdate(
      { _id: id, createdBy: { $ne: undefined } },
      updateForeignExchangeDto,
      { new: true },
    );

    if (!foreignExchange)
      throw new BadRequestException(
        Messages.error.notFound(ModuleItems.foreignExchange),
      );

    return foreignExchange;
  }

  async remove(id: string): Promise<boolean> {
    const foreignExchange = await this.findOne(id);

    if (!foreignExchange.createdBy)
      throw new ForbiddenException(Messages.error.onDeleteForeignExchange());

    const result = await this.foreignExchangeModel.deleteOne({ _id: id });

    return !!result.deletedCount;
  }
}
