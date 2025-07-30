import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { StopwatchService } from './stopwatch.service';
import { CreateStopwatchFromClientDto, UpdateStopwatchDto } from './dto';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/user-features/auth/auth.service';

@WebSocketGateway()
export class StopwatchGateway {
  constructor(
    private readonly stopwatchService: StopwatchService,
    private readonly authService: AuthService,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('createStopwatch')
  async create(
    @MessageBody() createStopwatchDto: CreateStopwatchFromClientDto,
    @ConnectedSocket() client: Socket,
  ) {
    const token = client.handshake.headers['x-access-token'];

    if (!token) throw new WsException('no token');

    const { data: user } = await this.authService.deserializer(
      token instanceof Array ? token[0] : token,
    );

    const stopwatch = await this.stopwatchService.create({
      ...createStopwatchDto,
      createdBy: user._id.toString(),
    });

    this.server.emit('setStopwatch', { data: stopwatch, userId: user._id });
  }

  @SubscribeMessage('updateStopwatch')
  async update(
    @MessageBody() updateStopwatchDto: UpdateStopwatchDto,
    @ConnectedSocket() client: Socket,
  ) {
    const token = client.handshake.headers['x-access-token'];

    if (!token) throw new WsException('no token');

    const { data } = await this.authService.deserializer(
      token instanceof Array ? token[0] : token,
    );

    const stopwatch = await this.stopwatchService.update(
      updateStopwatchDto._id,
      updateStopwatchDto,
    );

    this.server.emit('setStopwatch', { data: stopwatch, userId: data._id });
  }

  @SubscribeMessage('removeStopwatch')
  async remove(@MessageBody() id: string) {
    const deleted = await this.stopwatchService.remove(id);

    if (!deleted) return;

    this.server.emit('removeStopwatch', { data: { _id: id } });
  }
}
