import http from "http";
import { Server as WebSocketServer } from "socket.io";
import app from "./app";
import { PORT } from "./config";
import connectToMongoDB from "./common/db";

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectToMongoDB();

    const server = http.createServer(app);

    const httpServer = server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

    const io = new WebSocketServer(httpServer, { cors: { origin: "*" } });

		io

    // await initSockets(io);
    // console.log("Sockets inicializados.");

    // await initTask();
    // console.log("Tareas iniciales completadas.");

    // await backgroundTask(io);
    // console.log("Tareas en segundo plano iniciadas.");
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // Salir del proceso en caso de error
  }
};

startServer();