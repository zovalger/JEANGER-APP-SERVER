import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemRequirementsDto } from 'src/common/dto/system-requirements.dto';
import { Bill, BillDocument, BillModel } from './models';
import { ForeignExchangeService } from 'src/foreign-exchange/foreign-exchange.service';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import { CreateBillDto, SetBillItemDto, UpdateBillDto } from './dto';
import { billHelper } from './helpers';
import {
  getItemInBillList,
  isIncomingItemMoreRecent,
} from './helpers/Bill.helpers';

@Injectable()
export class BillService {
  constructor(
    private readonly foreignExchangeService: ForeignExchangeService,
    @InjectModel(BillModel.name)
    private readonly billModel: Model<Bill>,
  ) {}

  async create(
    createBillDto: CreateBillDto,
    systemRequirementsDto: SystemRequirementsDto,
  ): Promise<BillDocument> {
    const { userId } = systemRequirementsDto;

    const bill = new this.billModel({
      ...createBillDto,
      createdBy: userId,
    });

    await bill.save();

    return bill;
  }

  async findAll() {
    const bills = await this.billModel.find().sort({ name: 1 });

    return bills;
  }

  async findOne(id: string) {
    const bill = await this.billModel.findById(id);

    if (!bill)
      throw new BadRequestException(Messages.error.notFound(ModuleItems.bill));

    return bill;
  }

  async update(
    id: string,
    updateBillDto: UpdateBillDto,
    systemRequirementsDto: SystemRequirementsDto,
  ) {
    await this.findOne(id);

    const bill = await this.billModel.findByIdAndUpdate(id, updateBillDto, {
      new: true,
    });

    return bill;
  }

  // todo: update items individual
  async setItem(
    billId: string,
    setBillItemDto: SetBillItemDto,
    systemRequirementsDto: SystemRequirementsDto,
  ) {
    const { userId } = systemRequirementsDto;

    if (!userId)
      throw new BadRequestException('todo: mensaje usuario no encontrado');

    const bill = await this.findOne(billId);
    const foreignExchange = await this.foreignExchangeService.last();

    //todo: ver si el guardado es mas reciente que el que viene llegando
    const IsMoreRecent = isIncomingItemMoreRecent(
      getItemInBillList(setBillItemDto.productId, bill.items)?.updatedAt,
      setBillItemDto?.updatedAt,
    );

    if (!IsMoreRecent) throw new BadRequestException('no actualizado');

    const { totals, items, updatedItem } = billHelper.updateBillItem(
      bill.items,
      { ...setBillItemDto, createdBy: userId },
      foreignExchange,
      { setQuantity: true },
    );

    await this.update(billId, { totals, items }, systemRequirementsDto);

    // si no hay nada no reenviar
    return updatedItem;
  }

  async remove(id: string) {
    const result = await this.billModel.deleteOne({ _id: id });

    return !!result.deletedCount;
  }
}
