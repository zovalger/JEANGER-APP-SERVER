import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth, GetUser } from 'src/user-features/auth/decorators';
import { UserDocument } from 'src/user-features/user/models/user.model';
import { CreateBillDto } from './dto/create-bill.dto';
import { BillService } from './bill.service';
import { SetBillItemFromClientDto } from './dto/set-bill-item-from-client.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  @Auth()
  async create(
    @Body() createBillDto: CreateBillDto,
    @GetUser() user: UserDocument,
  ) {
    const bill = await this.billService.create(createBillDto, {
      userId: user._id.toString(),
    });
    return { data: bill };
  }

  @Get()
  @Auth()
  async findAll() {
    const bills = await this.billService.findAll();
    return { data: bills };
  }

  // @Get(':id')
  // @Auth()
  // async findOne(@Param('id') id: string) {
  //   const bill = await this.billService.findOne(id);
  //   return { data: bill };
  // }

  // @Patch(':id')
  // @Auth()
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateBillDto: UpdateBillFromClientDto,
  // ) {
  //   const bill = await this.billService.update(id, updateBillDto);
  //   return { data: bill };
  // }

  @Patch(':id/item')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() setBillItemFromClientDto: SetBillItemFromClientDto,
    @GetUser() user: UserDocument,
  ) {
    const item = await this.billService.setItem(id, setBillItemFromClientDto, {
      userId: user._id.toString(),
    });

    return { data: item };
  }

  // @Delete(':id')
  // @Auth()
  // async remove(@Param('id') id: string) {
  //   const bill = await this.billService.remove(id);
  //   return { data: bill };
  // }
}
