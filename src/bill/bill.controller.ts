import { Body, Controller, Post } from '@nestjs/common';
import { Auth, GetUser } from 'src/user-features/auth/decorators';
import { UserDocument } from 'src/user-features/user/models/user.model';
import { CreateBillDto } from './dto/create-bill.dto';
import { BillService } from './bill.service';

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

  // @Get()
  // @Auth()
  // async findAll() {
  //   const bills = await this.billService.findAll();
  //   return { data: bills };
  // }

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

  // @Delete(':id')
  // @Auth()
  // async remove(@Param('id') id: string) {
  //   const bill = await this.billService.remove(id);
  //   return { data: bill };
  // }
}
