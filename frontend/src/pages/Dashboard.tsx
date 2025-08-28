import { useEffect, useState } from 'react';
import { api, setAuthToken } from '../services/api';
import SessionQr from '../components/SessionQr';

interface Session { id: string; name: string; status: string; }

export default function Dashboard() {
  const token = localStorage.getItem('token') || '';
  setAuthToken(token);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [newSessionName, setNewSessionName] = useState('');

  async function fetchSessions() {
    const res = await api.get('/sessions');
    setSessions(res.data);
  }

  async function createSession() {
    const res = await api.post('/sessions', { name: newSessionName || 'Nova sessão' });
    setSessions(prev => [...prev, res.data]);
  }

  useEffect(() => { fetchSessions(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: 12 }}>
        <input placeholder="Nome da sessão" value={newSessionName} onChange={e => setNewSessionName(e.target.value)} />
        <button onClick={createSession} style={{ marginLeft: 8 }}>Criar sessão</button>
      </div>
      <div>
        {sessions.map(sess => (
          <div key={sess.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
            <p>{sess.name} - {sess.status}</p>
            <SessionQr sessionId={sess.id} token={token} />
          </div>
        ))}
      </div>
    </div>
  );
}
