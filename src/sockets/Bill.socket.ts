import { Server, Socket } from "socket.io";
import { BillEvents } from "../config/SocketEventsSystem";
import { BillFromSocket } from "../types";
import {
	createBill_service,
	deleteBill_service,
	updateBills_service,
} from "../services/BillService";
import { isValidObjectId } from "mongoose";

// is uuid
const isUUID = new RegExp(
	/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
);

// const ismongoID = new RegExp(/^[0-9a-fA-F]{24}$/);

const BillSocket = (io: Server, socket: Socket) => {
	// recibir dato para crear nuevo reloj
	socket.on(BillEvents.send, async (data: BillFromSocket) => {
		const { _id } = data;

		const newData = { ...data };

		let billSaved = null;

		if (isUUID.test(_id) || !_id) {
			newData._id = "";
			billSaved = await createBill_service({ ...data });
		}

		if (isValidObjectId(_id)) {
			billSaved = await updateBills_service(_id, data);
		}

		io.emit(BillEvents.send, { data: billSaved, oldId: _id });
	});

	socket.on(BillEvents.delete, async (_id: string) => {
		await deleteBill_service(_id);

		io.emit(BillEvents.delete, _id);
	});
};

export default BillSocket;
