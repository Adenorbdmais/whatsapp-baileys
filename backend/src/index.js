const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const sessionRoutes = require("./routes/sessionRoutes");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Config DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test DB
pool.connect()
  .then(() => console.log("✅ Conectado ao Postgres"))
  .catch(err => console.error("❌ Erro ao conectar ao Postgres", err));

// Rotas
app.use("/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API WhatsApp Baileys rodando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const sessionRoutes = require("./routes/sessionRoutes");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Config DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test DB
pool.connect()
  .then(() => console.log("✅ Conectado ao Postgres"))
  .catch(err => console.error("❌ Erro ao conectar ao Postgres", err));

// Rotas
app.use("/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API WhatsApp Baileys rodando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

