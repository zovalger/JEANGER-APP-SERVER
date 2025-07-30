import { Controller, Get, Param } from '@nestjs/common';
import { StopwatchService } from './stopwatch.service';
import { Auth } from 'src/user-features/auth/decorators';

@Controller('stopwatch')
export class StopwatchController {
  constructor(private readonly stopwatchService: StopwatchService) {}

  @Get()
  @Auth()
  async findAll() {
    const stopwatchs = await this.stopwatchService.findAll();
    return { data: stopwatchs };
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string) {
    const stopwatch = await this.stopwatchService.findOne(id);
    return { data: stopwatch };
  }
}
