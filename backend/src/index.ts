import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import sessionsRoutes from './routes/sessions';
import { initBaileysManager, setIo } from './services/baileysManager';

const app = express();
const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: '*' } });
setIo(io);

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionsRoutes);

initBaileysManager();

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
