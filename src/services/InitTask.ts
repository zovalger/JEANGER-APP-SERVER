import { getDolarFromBCV } from "./DolarService";


export default async function initTask(): Promise<void> {
	// actualizacion de dolar
	try {
	 await	getDolarFromBCV()
	} catch (error) {
		console.log(error);
	}
}
