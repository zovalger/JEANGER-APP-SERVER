import https from "https";
import axios from "axios";
import cheerio from "cheerio";
import toUpperCamelCase from "./strUpperCamelCase";
import { ForeignExchange } from "../types";

export default async function BCV_ForeignExchange(): Promise<
	Omit<ForeignExchange, "date">
> {
	const url = `https://www.bcv.org.ve/`;

	const agent = new https.Agent({
		rejectUnauthorized: false,
	});

	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url,
		headers: {},
		httpsAgent: agent,
	};

	try {
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

		const dolar = parseFloat(
			toUpperCamelCase($(`#dolar`).text()).split(" ")[1].replace(",", ".")
		);
		const euro = parseFloat(
			toUpperCamelCase($(`#euro`).text()).split(" ")[1].replace(",", ".")
		);

		const fecha = $(
			`.view-id-tipo_de_cambio_oficial_del_bcv .date-display-single`
		).attr("content");

		if (!dolar || !euro || !fecha) throw new Error("error al obtener divisas");

		const foreignExchange = {
			dolar,
			euro,
			bankBusinessDate: new Date(fecha),
		};

		return foreignExchange;
	} catch (error) {
		console.log(error);
		throw new Error("error al obtener divisas");
	}
}
