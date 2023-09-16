import { Server, Socket } from "socket.io";
import { BillEvents } from "../config/SocketEventsSystem";
import { Bill } from "../types";

const BillSocket = (_io: Server, socket: Socket) => {
	// recibir dato para crear nuevo reloj
	socket.on(BillEvents.send, async (data: Bill) => {
		// const bill = await createStopwatch_service(data);

		socket.broadcast.emit(BillEvents.send, data);
	});
};

export default BillSocket;
