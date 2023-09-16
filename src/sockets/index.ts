import { Server } from "socket.io";
import StopwatchSocket from "./Stopwatch.socket";
import SocketEventsSystem from "../config/SocketEventsSystem";
import BillSocket from "./Bill.socket";

const initSockets = async (io: Server) => {
	io.on("connection", (socket) => {
		StopwatchSocket(io, socket);
		BillSocket(io, socket);
		socket.on(SocketEventsSystem.disconnect, () => {});
	});
};

export default initSockets;
