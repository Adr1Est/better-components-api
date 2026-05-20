import http from 'http';
import app from '@/app';
import { envs } from './config/envs';

const PORT: number = envs.port;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto: ${PORT}`);
});