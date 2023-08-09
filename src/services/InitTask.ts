import BCV_ForeignExchange from "../utils/BCV_ForeignExchange";
import { createDolarValue } from "./DolarService";

export default async function initTask(): Promise<void> {
	// actualizacion de dolar
	try {
		const foreignExchange = await BCV_ForeignExchange();

		if (foreignExchange != null) {
			await createDolarValue({
				value: foreignExchange.dolar,
				date: new Date(),
			});
		}
	} catch (error) {
		console.log(error);
	}
}
