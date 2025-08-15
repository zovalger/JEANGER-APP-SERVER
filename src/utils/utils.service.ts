import { BadRequestException, Injectable } from '@nestjs/common';
import { MovilnetQueryDto } from './dto/movilnet-query.dto';
import movilnetRequest from './helpers/MovilnetConsult';

@Injectable()
export class UtilsService {
  async getMovilnetBalance(movilnetQueryDto: MovilnetQueryDto) {
    const data = await movilnetRequest(movilnetQueryDto.phoneNumber);

    if (!data) throw new BadRequestException('Error al obtener balance');

    return data;
  }
}
