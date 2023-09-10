import axios from "axios";
import cheerio from "cheerio";
import toUpperCamelCase from "./strUpperCamelCase";
import { ForeignExchange } from "../types";

export default async function BCV_ForeignExchange(): Promise<
	Omit<ForeignExchange, "date">
> {
	const url = `https://www.bcv.org.ve/`;

	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url,
		headers: {},
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

		const foreignExchange = {
			dolar,
			euro,
		};

		return foreignExchange;
	} catch (error) {
		console.log(error);
		throw new Error("error al obtener divisas");
	}
}
