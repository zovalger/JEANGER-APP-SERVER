import axios from 'axios';
import * as cheerio from 'cheerio';

export interface IMovilnetBalance {
  saldo: string;
  status: string;
  date: string;
}

const url = 'http://www.movilnet.com.ve/consultarabono/Chek?watch=c';

export default async function movilnetRequest(
  phoneNumber: string,
): Promise<IMovilnetBalance> {
  try {
    const config = {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const { data: html } = await axios.post(
      url,
      { telefono: phoneNumber },
      config,
    );

    const $ = cheerio.load(html);

    const [saldo, status, date] = $('.collection-item');

    const result = {
      saldo: $(saldo).text(),
      status: $(status).text(),
      date: $(date).text(),
    };

    return result;
  } catch (error) {
    console.log(error);
    throw new Error('error al obtener balance');
  }
}
