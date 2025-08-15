import { Controller, Get, Query } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { MovilnetQueryDto } from './dto/movilnet-query.dto';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get('movilnet-balance')
  async movilnetBalance(@Query() movilnetQueryDto: MovilnetQueryDto) {
    const data = await this.utilsService.getMovilnetBalance(movilnetQueryDto);

    return { data };
  }
}
