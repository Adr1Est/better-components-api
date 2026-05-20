import { Server } from "socket.io";
import { registerMessageSocket } from "@/sockets/message.socket";

export const registerSockets = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    registerMessageSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
}