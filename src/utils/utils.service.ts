import { BadRequestException, Injectable } from '@nestjs/common';
import { MovilnetQueryDto } from './dto/movilnet-query.dto';
import movilnetRequest from './helpers/MovilnetConsult';
import { VenezuelanQueryDto } from './dto/venezuelan-query.dto';
import consultCIVenezuelanRequest from './helpers/ci-venezuelan';

@Injectable()
export class UtilsService {
  async getMovilnetBalance(movilnetQueryDto: MovilnetQueryDto) {
    const data = await movilnetRequest(movilnetQueryDto.phoneNumber);

    if (!data) throw new BadRequestException('Error al obtener balance');

    return data;
  }

  async getVenezuelanData(venezuelanQueryDto: VenezuelanQueryDto) {
    const data = await consultCIVenezuelanRequest(venezuelanQueryDto);

    if (!data) throw new BadRequestException('Datos no obtenidos');

    return data;
  }
}
