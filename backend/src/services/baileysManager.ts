import makeWASocket, { DisconnectReason, useSingleFileAuthState, Browsers } from '@adiwajshing/baileys';
import { Server as IOServer } from 'socket.io';
import fs from 'fs';
import path from 'path';

const SESSIONS_ROOT = path.join(process.cwd(), 'auth');
if (!fs.existsSync(SESSIONS_ROOT)) fs.mkdirSync(SESSIONS_ROOT);

const sockets = new Map<string, ReturnType<typeof makeWASocket>>();
let io: IOServer | null = null;

export function setIo(socketIo: IOServer) { io = socketIo; }
export function initBaileysManager() { /* placeholder */ }

export async function createSession(sessionId: string) {
  const sessionDir = path.join(SESSIONS_ROOT, `session-${sessionId}`);
  if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });
  const authFile = path.join(sessionDir, 'auth_info.json');
  const { state, saveState } = useSingleFileAuthState(authFile as any);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    browser: Browsers.macOS('WhatsApp-API')
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('connection.update', (update: any) => {
    const { connection, qr } = update;
    if (qr && io) io.to(sessionId).emit('qr', { sessionId, qr });
    if (connection === 'open') {
      sockets.set(sessionId, sock);
      if (io) io.to(sessionId).emit('status', { sessionId, status: 'connected' });
    }
    if (connection === 'close') {
      sockets.delete(sessionId);
      if (io) io.to(sessionId).emit('status', { sessionId, status: 'disconnected' });
    }
  });
  return { sessionId, authPath: sessionDir };
}

export async function closeSession(sessionId: string) {
  const sock = sockets.get(sessionId);
  if (sock) {
    try { await sock.logout(); } catch {};
    sockets.delete(sessionId);
  }
  const sessionDir = path.join(SESSIONS_ROOT, `session-${sessionId}`);
  try { fs.rmSync(sessionDir, { recursive: true, force: true }); } catch {};
}
