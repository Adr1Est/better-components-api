import { Server, Socket } from "socket.io";

export const registerMessageSocket = (io: Server, socket: Socket) => {
  socket.emit("connected", {
    message: "WebSocket conectado",
  });

  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("message", {
      text: "El mensaje ha sido recibido",
    });
  });

  setTimeout(() => {
    socket.emit("message", {
      message: "Mensaje desde backend con 3 seg de retardo",
    });
  }, 3000);
}