import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { BillService } from './bill.service';
import { Server, Socket } from 'socket.io';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { BillSocketEvents } from './enums';
import { AuthSocket, GetUserSocket } from 'src/user-features/auth/decorators';
import { UserDocument } from 'src/user-features/user/models/user.model';
import {
  DeleteBillItemFromSocketDto,
  RenameBillDto,
  SetBillItemFromSocketDto,
} from './dto';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import { DeleteBillDto } from './dto/delete-bill.dto';

@WebSocketGateway({ cors: { origin: '*' } })
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

  @SubscribeMessage(BillSocketEvents.rename)
  @AuthSocket()
  async update(
    @ConnectedSocket() client: Socket,
    @GetUserSocket() user: UserDocument,
    @MessageBody() renameBillDto: RenameBillDto,
  ) {
    const { _id, name, createdAt, updatedAt } = await this.billService.update(
      renameBillDto._id,
      renameBillDto,
      {
        userId: user._id.toString(),
      },
    );

    client.broadcast.emit(BillSocketEvents.rename, {
      data: { _id, name, createdAt, updatedAt },
      userId: user._id.toString(),
    });
  }

  @SubscribeMessage(BillSocketEvents.remove)
  @AuthSocket()
  async remove(
    @ConnectedSocket() client: Socket,
    @GetUserSocket() user: UserDocument,
    @MessageBody() deleteBillDto: DeleteBillDto,
  ) {
    const deleted = await this.billService.remove(deleteBillDto, {
      userId: user._id.toString(),
    });

    if (!deleted) return;

    client.broadcast.emit(BillSocketEvents.remove, {
      data: deleteBillDto,
      userId: user._id.toString(),
    });
  }

  @SubscribeMessage(BillSocketEvents.setItem)
  @AuthSocket()
  async updateItem(
    @ConnectedSocket() client: Socket,
    @GetUserSocket() user: UserDocument,
    @MessageBody() setBillItemFromSocketDto: SetBillItemFromSocketDto,
  ) {
    const { billId, ...rest } = setBillItemFromSocketDto;

    const item = await this.billService.setItem(
      billId,
      { ...rest, createdBy: user._id.toString() },
      { userId: user._id.toString() },
    );

    if (!item)
      throw new WsException(Messages.error.dataIsOlder(ModuleItems.billItem));

    client.broadcast.emit(BillSocketEvents.setItem, {
      billId,
      data: item,
      userId: user._id.toString(),
    });
  }

  @SubscribeMessage(BillSocketEvents.removeItem)
  @AuthSocket()
  async removeItem(
    @ConnectedSocket() client: Socket,
    @GetUserSocket() user: UserDocument,
    @MessageBody() deleteBillItemFromSocketDto: DeleteBillItemFromSocketDto,
  ) {
    const { billId, ...rest } = deleteBillItemFromSocketDto;

    const result = await this.billService.deleteItem(
      billId,
      { ...rest, createdBy: user._id.toString() },
      { userId: user._id.toString() },
    );

    if (!result) return;

    client.broadcast.emit(BillSocketEvents.removeItem, {
      billId,
      data: rest,
      userId: user._id.toString(),
    });
  }
}
