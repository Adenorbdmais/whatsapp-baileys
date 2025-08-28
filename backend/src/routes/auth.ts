import { Router } from 'express';
import pool from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const pwHash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (email, password_hash, name) VALUES ($1,$2,$3) RETURNING id,email,name',
    [email, pwHash, name]
  );
  const user = result.rows[0];
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '8h' });
  res.json({ user, token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT id, email, password_hash, name FROM users WHERE email=$1', [email]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '8h' });
  res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
});

export default router;
