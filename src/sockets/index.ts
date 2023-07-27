import { Server } from "socket.io";
import StopwatchSocket from "./StopWatch.socket";

const initSockets = async (io: Server) => {
	io.on("connection", (socket) => {
		StopwatchSocket(io, socket);
	});
};

export default initSockets;
