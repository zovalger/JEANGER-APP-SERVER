import cron from "node-cron";
import { getDolarFromBCV } from "./DolarService";
import { Server } from "socket.io";
import { DolarEvent } from "../config/SocketEventsSystem";

// other funtions

const updateDolarFromDCBPage = (io: Server) =>
	cron.schedule("2 9,16 * * *", async () => {
		const dolar = await getDolarFromBCV();

		if (!dolar) return;

		io.emit(DolarEvent.update, dolar);

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
