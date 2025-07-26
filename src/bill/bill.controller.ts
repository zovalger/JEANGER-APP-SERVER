import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth, GetUser } from 'src/user-features/auth/decorators';
import { UserDocument } from 'src/user-features/user/models/user.model';
import { BillService } from './bill.service';
import {
  BasicUpdateBillDto,
  CreateBillDto,
  DeleteBillItemFromClientDto,
  SetBillItemFromClientDto,
} from './dto';

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

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string) {
    const bill = await this.billService.findOne(id);
    return { data: bill };
  }

  @Patch(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() basicUpdateBillDto: BasicUpdateBillDto,
    @GetUser() user: UserDocument,
  ) {
    const bill = await this.billService.update(id, basicUpdateBillDto, {
      userId: user._id.toString(),
    });

    return { data: bill };
  }

  @Delete(':id')
  @Auth()
  async remove(@Param('id') id: string, @GetUser() user: UserDocument) {
    const bill = await this.billService.remove(id, {
      userId: user._id.toString(),
    });
    return { data: bill };
  }

  @Post(':id/item')
  @Auth()
  async updateItem(
    @Param('id') id: string,
    @Body() setBillItemFromClientDto: SetBillItemFromClientDto,
    @GetUser() user: UserDocument,
  ) {
    const item = await this.billService.setItem(
      id,
      { ...setBillItemFromClientDto, createdBy: user._id.toString() },
      { userId: user._id.toString() },
    );

    return { data: item };
  }

  @Delete(':id/item')
  @Auth()
  async removeItem(
    @Param('id') id: string,
    @Body() deleteBillItemFromClientDto: DeleteBillItemFromClientDto,
    @GetUser() user: UserDocument,
  ) {
    const bill = await this.billService.deleteItem(
      id,
      { ...deleteBillItemFromClientDto, createdBy: user._id.toString() },
      { userId: user._id.toString() },
    );
    return { data: bill };
  }
}
