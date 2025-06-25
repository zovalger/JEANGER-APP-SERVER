import { getForeignExchangeFromBCV } from "./ForeignExchangeService";

export default async function initTask(): Promise<void> {
	// actualizacion de dolar
	try {
		await getForeignExchangeFromBCV();
	} catch (error) {
		console.log(error);
	}
}
