import axios from "axios";
import cheerio from "cheerio";
import toUpperCamelCase from "./strUpperCamelCase";

export default async function CNE_CI(CI: string) {
	const url = `http://www.cne.gob.ve/web/registro_civil/buscar_rep.php?nac=V&ced=${CI}`;

	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url,
		headers: {},
	};

	try {
		const { data: html } = await axios(config);

		const $ = cheerio.load(html);

		const name = toUpperCamelCase($("b").text());

		console.log(name);

		return name;
	} catch (error) {
		console.log(error);
	}

	return;
}
