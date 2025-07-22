import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@WebSocketGateway()
export class BillGateway {
  constructor(private readonly billService: BillService) {}

  @SubscribeMessage('createBill')
  create(@MessageBody() createBillDto: CreateBillDto) {
    // return this.billService.create(createBillDto);
  }

  @SubscribeMessage('findAllBill')
  findAll() {
    // return this.billService.findAll();
  }

  @SubscribeMessage('findOneBill')
  findOne(@MessageBody() id: string) {
    // return this.billService.findOne(id);
  }

  @SubscribeMessage('updateBill')
  update(@MessageBody() updateBillDto: UpdateBillDto) {
    // return this.billService.update(updateBillDto._id, updateBillDto);
  }

  @SubscribeMessage('removeBill')
  remove(@MessageBody() id: string) {
    // return this.billService.remove(id);
  }
}
