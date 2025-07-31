import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ForeignExchangeService } from './foreign-exchange.service';
import { CreateForeignExchangeDto } from './dto/create-foreign-exchange.dto';
import { UpdateForeignExchangeDto } from './dto/update-foreign-exchange.dto';
import { Auth, GetUser } from 'src/user-features/auth/decorators';
import { Types } from 'mongoose';
import { ForeignExchangeGateway } from './foreign-exchange.gateway';
import { ForeignExchangeSocketEvents } from './enums/foreign-exchange-socket-events.enum';
import { ForeignExchangeDocument } from './models/foreign-exchange.model';

@Controller('foreign-exchange')
export class ForeignExchangeController {
  constructor(
    private readonly foreignExchangeService: ForeignExchangeService,
    private readonly foreignExchangeGateway: ForeignExchangeGateway,
  ) {}

  @Post()
  @Auth()
  async create(
    @GetUser('_id') userId: Types.ObjectId,
    @Body() createForeignExchangeDto: CreateForeignExchangeDto,
  ) {
    const foreignExchange = await this.foreignExchangeService.create(
      createForeignExchangeDto,
      userId.toString(),
    );

    this.send(foreignExchange);

    return { data: foreignExchange };
  }

  @Post('scraping')
  async webScraping() {
    const foreignExchange = await this.foreignExchangeService.webScraping();

    this.send(foreignExchange);

    return { data: foreignExchange };
  }

  @Get()
  @Auth()
  async findAll() {
    // todo: hacer paginacion y busquedas
    const foreignExchanges = await this.foreignExchangeService.findAll();

    return { data: foreignExchanges };
  }

  @Get('last')
  async last() {
    const foreignExchange = await this.foreignExchangeService.last();
    return { data: foreignExchange };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foreignExchange = await this.foreignExchangeService.findOne(id);
    return { data: foreignExchange };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateForeignExchangeDto: UpdateForeignExchangeDto,
  ) {
    const foreignExchange = await this.foreignExchangeService.update(
      id,
      updateForeignExchangeDto,
    );

    this.send(foreignExchange);

    return { data: foreignExchange };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.foreignExchangeService.remove(id);

    // todo: ver que hacer con el socket cuando se elimina un registro

    return { data: result };
  }

  private send(foreignExchangeDocument: ForeignExchangeDocument) {
    this.foreignExchangeGateway.server.emit(ForeignExchangeSocketEvents.set, {
      data: foreignExchangeDocument,
    });
  }
}
