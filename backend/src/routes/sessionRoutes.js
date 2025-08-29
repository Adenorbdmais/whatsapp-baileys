nano backend/src/routes/sessionRoutes.js
const express = require("express");
const router = express.Router();
const { createSession, listSessions } = require("../services/sessionService");
const authMiddleware = require("../middlewares/authMiddleware");

// Criar sessão
router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const session = await createSession(name);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar sessões
router.get("/", authMiddleware, async (req, res) => {
  try {
    const sessions = await listSessions();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

