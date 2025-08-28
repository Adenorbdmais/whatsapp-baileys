import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setAuthToken } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Falha no login');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 100 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 8 }}>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
