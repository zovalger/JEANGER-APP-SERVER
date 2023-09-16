import { Server, Socket } from "socket.io";
import { BillEvents } from "../config/SocketEventsSystem";
import { BillFromSocket } from "../types";
import {
	createBill_service,
	deleteBill_service,
	updateBills_service,
} from "../services/BillService";

const BillSocket = (io: Server, socket: Socket) => {
	// recibir dato para crear nuevo reloj
	socket.on(BillEvents.send, async (data: BillFromSocket) => {
		const { _id } = data;

		let billSaved = _id
			? await updateBills_service(_id, data)
			: await createBill_service(data);

		io.emit(BillEvents.send, { data: billSaved, oldId: _id });
	});

	socket.on(BillEvents.delete, async (_id: string) => {
		await deleteBill_service(_id);

		io.emit(BillEvents.delete, _id);
	});
};

export default BillSocket;
