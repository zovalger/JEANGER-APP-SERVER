import axios from "axios";
import qs from "qs";
import cheerio from "cheerio";
import { saldoMovilnet } from "../types";

const url = "http://www.movilnet.com.ve/consultarabono/Chek?watch=c";

export default async function MovilnetConsult(
	phoneNumber: string
): Promise<saldoMovilnet | undefined> {
	let data = qs.stringify({ telefono: phoneNumber });

	try {
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: data,
		};

		const { data: html } = await axios.request(config);

		const $ = cheerio.load(html);

		const [saldo, status, date] = $(".collection-item");

		const result = {
			saldo: $(saldo).text(),
			status: $(status).text(),
			date: $(date).text(),
		};

		return result;
	} catch (error) {
		console.log(error);
	}

	return;
}
