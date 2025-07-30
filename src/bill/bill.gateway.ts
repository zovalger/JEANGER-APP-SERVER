import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { BillService } from './bill.service';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/user-features/auth/auth.service';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  BasicUpdateBill_bySocket_Dto,
  CreateBillDto,
  DeleteBillItemFromClientDto,
  SetBillItemFromClientDto,
} from './dto';

@WebSocketGateway()
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class BillGateway {
  constructor(
    private readonly billService: BillService,
    private readonly authService: AuthService,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('createBill')
  async create(
    @MessageBody() createBillDto: CreateBillDto,
    @ConnectedSocket() client: Socket,
  ) {
    // todo: crear un guard para el socket
    const token = client.handshake.headers['x-access-token'];

    if (!token) throw new WsException('no token');

    const { data: user } = await this.authService.deserializer(
      token instanceof Array ? token[0] : token,
    );

    const bill = await this.billService.create(
      { ...createBillDto },
      { userId: user._id.toString() },
    );

    this.server.emit('setBill', { data: bill, userId: user._id });
  }

  @SubscribeMessage('updateBill')
  async update(
    @MessageBody() basicUpdateBill_bySocket_Dto: BasicUpdateBill_bySocket_Dto,
    @ConnectedSocket() client: Socket,
  ) {
    const token = client.handshake.headers['x-access-token'];

    if (!token) throw new WsException('no token');

    const { data: user } = await this.authService.deserializer(
      token instanceof Array ? token[0] : token,
    );

    const id =
      basicUpdateBill_bySocket_Dto.tempId || basicUpdateBill_bySocket_Dto._id;

    const bill = await this.billService.update(
      id,
      basicUpdateBill_bySocket_Dto,
      { userId: user._id.toString() },
    );

    this.server.emit('setStopwatch', {
      data: bill,
      userId: user._id.toString(),
    });
  }

  @SubscribeMessage('removeBill')
  async remove(@MessageBody() id: string, @ConnectedSocket() client: Socket) {
    const token = client.handshake.headers['x-access-token'];

    if (!token) throw new WsException('no token');

    const { data: user } = await this.authService.deserializer(
      token instanceof Array ? token[0] : token,
    );

    const deleted = await this.billService.remove(id, {
      userId: user._id.toString(),
    });

    if (!deleted) return;

    this.server.emit('removeStopwatch', {
      data: { _id: id },
      userId: user._id.toString(),
    });
  }

  @SubscribeMessage('bill/set-item')
  async updateItem(
    @ConnectedSocket() client: Socket,
    @MessageBody() setBillItemFromClientDto: SetBillItemFromClientDto,
  ) {
    const token = client.handshake.headers['x-access-token'];

    if (!token) throw new WsException('no token');

    const { data: user } = await this.authService.deserializer(
      token instanceof Array ? token[0] : token,
    );

    const item = await this.billService.setItem(
      setBillItemFromClientDto._id,
      { ...setBillItemFromClientDto, createdBy: user._id.toString() },
      { userId: user._id.toString() },
    );

    this.server.emit('bill/set-item', {
      data: item,
      userId: user._id.toString(),
    });
  }

  @SubscribeMessage('bill/delete-item')
  async removeItem(
    @ConnectedSocket() client: Socket,
    @MessageBody() deleteBillItemFromClientDto: DeleteBillItemFromClientDto,
  ) {
    const token = client.handshake.headers['x-access-token'];

    if (!token) throw new WsException('no token');

    const { data: user } = await this.authService.deserializer(
      token instanceof Array ? token[0] : token,
    );

    const result = await this.billService.deleteItem(
      deleteBillItemFromClientDto._id,
      { ...deleteBillItemFromClientDto, createdBy: user._id.toString() },
      { userId: user._id.toString() },
    );

    if (!result) return;

    this.server.emit('bill/delete-item', {
      data: deleteBillItemFromClientDto,
      userId: user._id.toString(),
    });
  }
}
