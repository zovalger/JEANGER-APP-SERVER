import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { StopwatchService } from './stopwatch.service';
import { CreateStopwatchDto, CreateStopwatchFromClientDto } from './dto';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class StopwatchGateway {
  constructor(private readonly stopwatchService: StopwatchService) {}

  @SubscribeMessage('createStopwatch')
  create(
    @MessageBody() createStopwatchDto: CreateStopwatchDto,
    @ConnectedSocket() client: Socket,
  ) {
    return createStopwatchDto;
  }

  @SubscribeMessage('findAllStopwatch')
  findAll() {
    return this.stopwatchService.findAll();
  }

  @SubscribeMessage('findOneStopwatch')
  findOne(@MessageBody() id: string) {
    return this.stopwatchService.findOne(id);
  }

  // @SubscribeMessage('updateStopwatch')
  // update(@MessageBody() updateStopwatchDto: UpdateStopwatchDto) {
  //   // return this.stopwatchService.update(
  //   //   updateStopwatchDto.id,
  //   //   updateStopwatchDto,
  //   // );
  // }

  @SubscribeMessage('removeStopwatch')
  remove(@MessageBody() id: string) {
    return this.stopwatchService.remove(id);
  }
}
