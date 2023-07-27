import { Server } from "socket.io";
import StopwatchSocket from "./Stopwatch.socket";
import SocketEventsSystem from "../config/SocketEventsSystem";

const initSockets = async (io: Server) => {
	io.on("connection", (socket) => {
		StopwatchSocket(io, socket);
		socket.on(SocketEventsSystem.disconnect, () => {});
	});
};

export default initSockets;
