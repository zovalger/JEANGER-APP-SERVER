import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Server } from 'socket.io';

import { StopwatchService } from './stopwatch.service';
import {
  CreateStopwatchFromSocketDto,
  RemoveStopwatchFromSocketDto,
  UpdateStopwatchFromSocketDto,
} from './dto';
import { StopwatchSocketEvents } from './enums';
import { AuthSocket, GetUserSocket } from 'src/user-features/auth/decorators';
import { UserDocument } from 'src/user-features/user/models/user.model';

@WebSocketGateway({ cors: { origin: '*' } })
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class StopwatchGateway {
  constructor(private readonly stopwatchService: StopwatchService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage(StopwatchSocketEvents.create)
  @AuthSocket()
  async create(
    @GetUserSocket() user: UserDocument,
    @MessageBody() createStopwatchDto: CreateStopwatchFromSocketDto,
  ) {
    const stopwatch = await this.stopwatchService.create({
      ...createStopwatchDto,
      createdBy: user._id.toString(),
    });

    this.server.emit(StopwatchSocketEvents.set, {
      data: stopwatch,
      userId: user._id,
    });
  }

  @SubscribeMessage(StopwatchSocketEvents.set)
  @AuthSocket()
  async update(
    @GetUserSocket() user: UserDocument,
    @MessageBody() updateStopwatchDto: UpdateStopwatchFromSocketDto,
  ) {
    const stopwatch = await this.stopwatchService.update(
      updateStopwatchDto._id,
      updateStopwatchDto,
    );

    this.server.emit(StopwatchSocketEvents.set, {
      data: stopwatch,
      userId: user._id,
    });
  }

  @SubscribeMessage(StopwatchSocketEvents.remove)
  @AuthSocket()
  async remove(
    @GetUserSocket() user: UserDocument,
    @MessageBody() removeStopwatchFromSocketDto: RemoveStopwatchFromSocketDto,
  ) {
    const deleted = await this.stopwatchService.remove(
      removeStopwatchFromSocketDto._id,
      removeStopwatchFromSocketDto,
    );

    if (!deleted) throw new WsException('error al eliminar stopwatch');

    this.server.emit(StopwatchSocketEvents.remove, {
      data: removeStopwatchFromSocketDto,
      userId: user._id,
    });
  }
}
