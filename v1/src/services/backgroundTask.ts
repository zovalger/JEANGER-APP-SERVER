import cron from "node-cron";
import { getForeignExchangeFromBCV } from "./ForeignExchangeService";
import { Server } from "socket.io";
import { ForeignExchangeEvent } from "../config/SocketEventsSystem";

// other funtions

const updateDolarFromDCBPage = (io: Server) =>
	cron.schedule("2 9,16 * * *", async () => {
		const dolar = await getForeignExchangeFromBCV();

		if (!dolar) return;

		io.emit(ForeignExchangeEvent.update, dolar);

		return;
	});

// ejecutable

export default async function backgroundTask(io: Server): Promise<void> {
	// actualizacion de dolar
	try {
		updateDolarFromDCBPage(io);
	} catch (error) {
		console.log(error);
	}
}
