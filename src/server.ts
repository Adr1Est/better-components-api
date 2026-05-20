import http from 'http';
import { Server } from 'socket.io';
import app from '@/app';
import { envs } from '@/config/envs';
import { registerSockets } from '@/sockets';

const PORT: number = envs.port;

const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: envs.origin,
    credentials: true,
  },
});

registerSockets(io);

server.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto: ${PORT}`);
});