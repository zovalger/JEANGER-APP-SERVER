import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemRequirementsDto } from 'src/common/dto/system-requirements.dto';
import { Bill, BillDocument, BillModel } from './models';
import { ForeignExchangeService } from 'src/foreign-exchange/foreign-exchange.service';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import {
  CreateBillDto,
  DeleteBillItemDto,
  SetBillItemDto,
  UpdateBillDto,
} from './dto';
import { billHelper } from './helpers';
import {
  calculateTotals,
  getItemInBillList,
  isIncomingItemMoreRecent,
} from './helpers/Bill.helpers';
import { ProductService } from 'src/product-features/product/services';
import { DeleteBillDto } from './dto/delete-bill.dto';

@Injectable()
export class BillService {
  constructor(
    private readonly foreignExchangeService: ForeignExchangeService,
    private readonly productService: ProductService,

    @InjectModel(BillModel.name)
    private readonly billModel: Model<Bill>,
  ) {}

  async create(
    createBillDto: CreateBillDto,
    systemRequirementsDto: SystemRequirementsDto,
  ): Promise<BillDocument> {
    if (!systemRequirementsDto.userId)
      throw new InternalServerErrorException('not user');

    const { userId } = systemRequirementsDto;
    const { items } = createBillDto;
    const toCreate = { ...createBillDto, createdBy: userId };

    // verifica que los productos si existen
    if (items) {
      const products = await this.productService.findAll({
        _id: items.map((i) => i.productId.toString()),
      });

      const newItems = items.map((i) => {
        const p = products.find(
          (a) => i.productId.toString() === a._id.toString(),
        );

        if (!p)
          throw new BadRequestException(
            Messages.error.notFound(ModuleItems.product),
          );

        return {
          ...i,
          cost: p.cost,
          currencyType: p.currencyType,
          createdBy: userId,
        };
      });

      const f = await this.foreignExchangeService.last();
      toCreate.items = newItems;
      toCreate.totals = calculateTotals(newItems, f);
    }

    const bill = new this.billModel(toCreate);

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
  ): Promise<BillDocument> {
    const { updatedAt } = updateBillDto;

    const old = await this.findOne(id);

    if (updatedAt && new Date(updatedAt).getTime() < old.updatedAt.getTime())
      throw new BadRequestException(
        Messages.error.dataIsOlder(ModuleItems.bill),
      );

    const bill = await this.billModel.findByIdAndUpdate(id, updateBillDto, {
      new: true,
    });

    return bill as BillDocument;
  }

  async remove(
    deleteBillDto: DeleteBillDto,
    systemRequirementsDto: SystemRequirementsDto,
  ) {
    const { updatedAt, _id } = deleteBillDto;

    const old = await this.findOne(_id);

    if (updatedAt && new Date(updatedAt).getTime() < old.updatedAt.getTime())
      throw new BadRequestException(
        Messages.error.dataIsOlder(ModuleItems.bill),
      );

    const result = await this.billModel.deleteOne({ _id });

    return !!result.deletedCount;
  }

  async setItem(
    billId: string,
    setBillItemDto: SetBillItemDto,
    systemRequirementsDto: SystemRequirementsDto,
  ) {
    const bill = await this.findOne(billId);
    const foreignExchange = await this.foreignExchangeService.last();
    const product = await this.productService.findOne(setBillItemDto.productId);

    const IsMoreRecent = isIncomingItemMoreRecent(
      getItemInBillList(setBillItemDto.productId, bill.items)?.updatedAt,
      setBillItemDto.updatedAt,
    );

    if (!IsMoreRecent) throw new BadRequestException('no actualizado');

    const { totals, items, updatedItem } = billHelper.updateBillItem(
      bill.items,
      {
        ...setBillItemDto,
        cost: product.cost,
        currencyType: product.currencyType,
      },
      foreignExchange,
      { setQuantity: true },
    );

    await this.update(billId, { totals, items }, systemRequirementsDto);

    // si no hay nada no reenviar
    return updatedItem;
  }

  async deleteItem(
    billId: string,
    deleteBillItemDto: DeleteBillItemDto,
    systemRequirementsDto: SystemRequirementsDto,
  ) {
    const bill = await this.findOne(billId);
    const foreignExchange = await this.foreignExchangeService.last();

    const IsMoreRecent = isIncomingItemMoreRecent(
      getItemInBillList(deleteBillItemDto.productId, bill.items)?.updatedAt,
      deleteBillItemDto.updatedAt,
    );

    if (!IsMoreRecent) throw new BadRequestException('no actualizado');

    const { totals, items } = billHelper.deleteItemInBill(
      bill.items,
      deleteBillItemDto.productId,
      foreignExchange,
    );

    await this.update(billId, { totals, items }, systemRequirementsDto);

    return true;
  }
}
