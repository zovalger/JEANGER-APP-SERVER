import cron from "node-cron";
import { getDolarFromBCV } from "./DolarService";

// other funtions

const updateDolarFromDCBPage = () =>
	cron.schedule("0 9,15 * * *", async () => {
		await getDolarFromBCV();
	});

// ejecutable

export default async function backgroundTask(): Promise<void> {
	// actualizacion de dolar
	try {
		updateDolarFromDCBPage();
	} catch (error) {
		console.log(error);
	}
}
