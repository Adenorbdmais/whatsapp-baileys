import axios from 'axios';
const base = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000';
export const api = axios.create({ baseURL: base + '/api' });

export function setAuthToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
