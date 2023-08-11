import http from "http";
import { Server as WebSocketServer } from "socket.io";
import app from "./app";
import { PORT } from "./config";
import connectToMongoDB from "./db";
import initSockets from "./sockets";
import initTask from "./services/InitTask";
import backgroundTask from "./services/backgroundTask";

(async () => {
	await connectToMongoDB();

	const server = http.createServer(app);
	const httpServer = server.listen(PORT);

	const io = new WebSocketServer(httpServer, { cors: { origin: "*" } });

	await initSockets(io);

	await initTask();

	await backgroundTask();
})();
