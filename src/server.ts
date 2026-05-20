import http from 'http';
import { Server } from 'socket.io';
import app from '@/app';
import { envs } from '@/config/envs';

const PORT: number = envs.port;

const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: envs.origin,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.emit("connected", {
    message: "WebSocket conectado",
  });

  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);

    io.emit("message", data);
  });

  setTimeout(() => {
    socket.emit("message", {
      message: "Mensaje desde backend con 3 seg de retardo",
    });
  }, 3000);

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto: ${PORT}`);
});