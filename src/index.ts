import http from "http";
import { Server as WebSocketServer } from "socket.io";
import app from "./app";
import { PORT } from "./config";
import connectToMongoDB from "./db";
import initSockets from "./sockets";

(async () => {
	await connectToMongoDB();

	const server = http.createServer(app);
	const httpServer = server.listen(PORT);

	const io = new WebSocketServer(httpServer);

	await initSockets(io);

	// app.listen(PORT);
})();
