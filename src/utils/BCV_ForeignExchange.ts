import axios from "axios";
import cheerio from "cheerio";
import toUpperCamelCase from "./strUpperCamelCase";

export default async function BCV_ForeignExchange() {
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

		const dolar = toUpperCamelCase($(`#dolar`).text());

		const d = dolar.split(" ");

		const foreignExchange = {
			dolar: parseFloat(d[1].replace(",", ".")),
		};

		console.log(foreignExchange);

		return foreignExchange;
	} catch (error) {
		console.log(error);
		return null;
	}
}
