import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { BillService } from './bill.service';
import { Server } from 'socket.io';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway()
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class BillGateway {
  constructor(private readonly billService: BillService) {}
  @WebSocketServer() server: Server;

  // @SubscribeMessage('createBill')
  // @AuthSocket()
  // async create(
  //   @GetUserSocket() user: UserDocument,
  //   @MessageBody() createBillDto: CreateBillDto,
  // ) {
  //   const bill = await this.billService.create(
  //     { ...createBillDto },
  //     { userId: user._id.toString() },
  //   );

  //   this.server.emit('setBill', { data: bill, userId: user._id });
  // }

  // @SubscribeMessage('updateBill')
  // @AuthSocket()
  // async update(
  //   @GetUserSocket() user: UserDocument,
  //   @MessageBody() basicUpdateBill_bySocket_Dto: BasicUpdateBill_bySocket_Dto,
  // ) {
  //   const id =
  //     basicUpdateBill_bySocket_Dto.tempId || basicUpdateBill_bySocket_Dto._id;

  //   const bill = await this.billService.update(
  //     id,
  //     basicUpdateBill_bySocket_Dto,
  //     { userId: user._id.toString() },
  //   );

  //   this.server.emit('setStopwatch', {
  //     data: bill,
  //     userId: user._id.toString(),
  //   });
  // }

  // @SubscribeMessage('removeBill')
  // @AuthSocket()
  // async remove(@GetUserSocket() user: UserDocument, @MessageBody() id: string) {
  //   const deleted = await this.billService.remove(id, {
  //     userId: user._id.toString(),
  //   });

  //   if (!deleted) return;

  //   this.server.emit('removeStopwatch', {
  //     data: { _id: id },
  //     userId: user._id.toString(),
  //   });
  // }

  // @SubscribeMessage('bill/set-item')
  // @AuthSocket()
  // async updateItem(
  //   @GetUserSocket() user: UserDocument,
  //   @MessageBody() setBillItemFromClientDto: SetBillItemFromClientDto,
  // ) {
  //   const item = await this.billService.setItem(
  //     setBillItemFromClientDto._id,
  //     { ...setBillItemFromClientDto, createdBy: user._id.toString() },
  //     { userId: user._id.toString() },
  //   );

  //   this.server.emit('bill/set-item', {
  //     data: item,
  //     userId: user._id.toString(),
  //   });
  // }

  // @SubscribeMessage('bill/delete-item')
  // @AuthSocket()
  // removeItem(
  //   @GetUserSocket() user: UserDocument,
  //   @MessageBody() deleteBillItemFromClientDto: DeleteBillItemFromClientDto,
  // ) {
  //   const result = await this.billService.deleteItem(
  //     deleteBillItemFromClientDto._id,
  //     { ...deleteBillItemFromClientDto, createdBy: user._id.toString() },
  //     { userId: user._id.toString() },
  //   );

  //   if (!result) return;

  //   this.server.emit('bill/delete-item', {
  //     data: deleteBillItemFromClientDto,
  //     userId: user._id.toString(),
  //   });
  // }
}
