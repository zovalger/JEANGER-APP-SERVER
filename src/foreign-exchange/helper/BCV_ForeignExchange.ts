import { Agent } from 'https';
import axios from 'axios';
import * as cheerio from 'cheerio';
// import toUpperCamelCase from './strUpperCamelCase';
import { CreateForeignExchangeDto } from '../dto/create-foreign-exchange.dto';

export default async function BCV_ForeignExchange(): Promise<CreateForeignExchangeDto> {
  const url = `https://www.bcv.org.ve/`;

  const agent = new Agent({
    rejectUnauthorized: false,
  });

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url,
    headers: {},
    httpsAgent: agent,
  };

  const { data: html } = await axios(config);

  const $ = cheerio.load(html);

  // un futuro para guardar las demas divisas

  // const divisas = [
  //   "euro",
  //   "yuan",
  //   "lira",
  //   "rublo",
  //   "dolar"
  // ]

  const f = (text: string): number => {
    const reg = new RegExp(/\d{1,}[,.]\d{1,}/);

    const match = text.match(reg);

    if (!match) return 0;

    return parseFloat(match[0].replace(',', '.'));
  };

  const dolar = f($(`#dolar`).text());
  const euro = f($(`#euro`).text());

  const fecha = $(
    `.view-id-tipo_de_cambio_oficial_del_bcv .date-display-single`,
  ).attr('content');

  if (!dolar || !euro || !fecha) throw new Error('error al obtener divisas');

  return { dolar, euro, bankBusinessDate: fecha };
}
