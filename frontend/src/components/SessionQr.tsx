import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import QRCode from 'qrcode.react';

export default function SessionQr({ sessionId, token }: { sessionId: string; token: string; }) {
  const [qr, setQr] = useState<string | null>(null);
  useEffect(() => {
    const socket = io((import.meta.env.VITE_API_URL as string) || 'http://localhost:4000', { auth: { token } });
    socket.emit('join', sessionId);
    socket.on('qr', (data: any) => { if (data.sessionId === sessionId) setQr(data.qr); });
    socket.on('status', (s: any) => console.log('status', s));
    return () => { socket.emit('leave', sessionId); socket.disconnect(); };
  }, [sessionId, token]);
  return qr ? <QRCode value={qr} size={256} /> : <p>Aguardando QR...</p>;
}
