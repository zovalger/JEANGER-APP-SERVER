import axios, { AxiosResponse } from 'axios';

export interface IRegistroOrearagua {
  nomb1: string;
  nomb2: string;
  apell1: string;
  apell2: string;
  sexo: string;
  anu: string;
  mes: string;
  dia: string;
  fechaNac: string;
}

export type IRegistroOrearaguaResponse = [IRegistroOrearagua];

export interface ICIVenezuelan {
  name: string;
  lastname: string;
  gender: string;
  birthdate: string;
}

export interface IRegistroOrearaguaParams {
  nationality: 'V' | 'E';
  CI: string;
}

export default async function consultCIVenezuelanRequest(
  query: IRegistroOrearaguaParams,
): Promise<ICIVenezuelan> {
  const { nationality, CI } = query;

  const url =
    'https://registro.orearagua.com.ve/app.pub/controladores/personas/buscarPersonaAvc.php';

  const config = {
    maxBodyLength: Infinity,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  const data = new FormData();
  data.append('cedU', nationality.toUpperCase() + CI);

  let res: null | AxiosResponse = null;
  try {
    await axios.get(
      `https://registro.orearagua.com.ve/app.pub/controladores/personas/verificaPersona.php?nac=${nationality}&ced=${CI}`,
    );

    res = await axios.post(url, data, config);
  } catch (error) {
    console.log(error);
  }

  if (res == null) throw new Error('Error al consultar datos');

  const civilianData = res.data as '0' | IRegistroOrearaguaResponse;

  if (typeof civilianData == 'string') throw new Error('Datos no encontrados');

  const { nomb1, nomb2, apell1, apell2, sexo, fechaNac } = civilianData[0];

  return {
    name: [nomb1, nomb2].join(' ').trim(),
    lastname: [apell1, apell2].join(' ').trim(),
    gender: sexo,
    birthdate: fechaNac,
  };
}

// const axios = require('axios');

// let config = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: 'https://registro.orearagua.com.ve/app.pub/controladores/personas/verificaPersona.php?nac=V&ced=28012656',
//   headers: { }
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });

// 0

// const axios = require('axios');
// const FormData = require('form-data');
// let data = new FormData();
// data.append('cedU', 'V28012656');

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://registro.orearagua.com.ve/app.pub/controladores/personas/buscarPersonaAvc.php',
//   headers: {
//     ...data.getHeaders(),
//   },
//   data: data,
// };

// axios
//   .request(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// [
//   {
//     nomb1: 'ANA',
//     nomb2: 'CELESTE',
//     apell1: 'MENDEZ',
//     apell2: 'MARTINEZ',
//     sexo: 'F',
//     anu: '2001',
//     mes: '1',
//     dia: '15',
//     fechaNac: '2001-01-15',
//   },
// ];

// 0
