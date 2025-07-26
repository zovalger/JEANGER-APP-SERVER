import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { StopwatchService } from './stopwatch.service';
import { CreateStopwatchDto } from './dto/create-stopwatch.dto';
import { UpdateStopwatchDto } from './dto/update-stopwatch.dto';

@WebSocketGateway()
export class StopwatchGateway {
  constructor(private readonly stopwatchService: StopwatchService) {}

  @SubscribeMessage('createStopwatch')
  create(@MessageBody() createStopwatchDto: CreateStopwatchDto) {
    return this.stopwatchService.create(createStopwatchDto);
  }

  @SubscribeMessage('findAllStopwatch')
  findAll() {
    return this.stopwatchService.findAll();
  }

  @SubscribeMessage('findOneStopwatch')
  findOne(@MessageBody() id: number) {
    return this.stopwatchService.findOne(id);
  }

  @SubscribeMessage('updateStopwatch')
  update(@MessageBody() updateStopwatchDto: UpdateStopwatchDto) {
    return this.stopwatchService.update(updateStopwatchDto.id, updateStopwatchDto);
  }

  @SubscribeMessage('removeStopwatch')
  remove(@MessageBody() id: number) {
    return this.stopwatchService.remove(id);
  }
}
