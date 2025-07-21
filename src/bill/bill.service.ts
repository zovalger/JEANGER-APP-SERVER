import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { SystemRequirementsDto } from 'src/common/dto/system-requirements.dto';
import { Bill, BillModel } from './models';
import { ForeignExchangeService } from 'src/foreign-exchange/foreign-exchange.service';

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
  ) {
    const { userId } = systemRequirementsDto;
    // const { foreignExchange } = createBillDto;

    // const f = foreignExchange || (await this.foreignExchangeService.last());

    const bill = new this.billModel({
      ...createBillDto,
      createdBy: userId,
    });

    await bill.save();

    return bill;
  }

  findAll() {
    return `This action returns all bill`;
  }

  findOne(id: string) {
    return `This action returns a #${id} bill`;
  }

  update(id: string, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: string) {
    return `This action removes a #${id} bill`;
  }
}
