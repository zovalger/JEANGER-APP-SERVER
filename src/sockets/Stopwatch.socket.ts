import { Server, Socket } from "socket.io";
import { StopwatchEvents } from "../config/SocketEventsSystem";
import {
	createStopwatch_service,
	deleteStopwatch_service,
	updateStopwatch_service,
} from "../services/StopwatchService";
import { Stopwatch } from "../types";

const StopwatchSocket = (io: Server, socket: Socket) => {
	// recibir dato para crear nuevo reloj
	socket.on(StopwatchEvents.create, async (data: Stopwatch) => {
		const stopwatch = await createStopwatch_service(data);

		io.emit(StopwatchEvents.sendUpdate, stopwatch);
	});

	socket.on(StopwatchEvents.sendUpdate, async (data: Stopwatch) => {
		const { _id } = data;

		if (!_id) return;

		const stopwatch = await updateStopwatch_service(_id, data);

		return socket.broadcast.emit(StopwatchEvents.sendUpdate, stopwatch);
	});

	// recibir dato para eliminar nuevo reloj
	socket.on(StopwatchEvents.delete, async (_id: string) => {
		const result = await deleteStopwatch_service(_id);

		if (!result) return;

		io.emit(StopwatchEvents.delete, _id);
	});
};

export default StopwatchSocket;
