import { Router } from 'express';
import auth from '../middlewares/auth';
import { createSession, closeSession } from '../services/baileysManager';
import pool from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.use(auth);

router.post('/', async (req: any, res) => {
  const userId = req.user.id;
  const name = req.body.name || 'Minha sessão';
  const id = uuidv4();
  const authPath = `auth/session-${id}`;
  await createSession(id);
  await pool.query(
    'INSERT INTO sessions (id, user_id, name, status, auth_path) VALUES ($1,$2,$3,$4,$5)',
    [id, userId, name, 'pending', authPath]
  );
  res.json({ id, name, status: 'pending' });
});

router.get('/', async (req: any, res) => {
  const userId = req.user.id;
  const result = await pool.query('SELECT id, name, status, created_at FROM sessions WHERE user_id=$1', [userId]);
  res.json(result.rows);
});

router.delete('/:id', async (req: any, res) => {
  const id = req.params.id;
  await closeSession(id);
  await pool.query('DELETE FROM sessions WHERE id=$1', [id]);
  res.json({ ok: true });
});

export default router;
