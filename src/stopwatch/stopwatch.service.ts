import { Injectable } from '@nestjs/common';
import { CreateStopwatchDto } from './dto/create-stopwatch.dto';
import { UpdateStopwatchDto } from './dto/update-stopwatch.dto';

@Injectable()
export class StopwatchService {
  create(createStopwatchDto: CreateStopwatchDto) {
    return 'This action adds a new stopwatch';
  }

  findAll() {
    return `This action returns all stopwatch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stopwatch`;
  }

  update(id: number, updateStopwatchDto: UpdateStopwatchDto) {
    return `This action updates a #${id} stopwatch`;
  }

  remove(id: number) {
    return `This action removes a #${id} stopwatch`;
  }
}
