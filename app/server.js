
import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = process.env.WEB_PORT || 3000;

const dbConfig = {
  host: process.env.DB_HOST || 'db',
  port: +(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'appdb',
};

const pool = new Pool(dbConfig);

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.send(`
    <main style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'; padding: 2rem;">
      <h1>Aplicação Dockerizada – Matheus Cuel</h1>
      <p>Disciplina: Programação para Dispositivos Móveis</p>
      <p>Esta aplicação está rodando em um container Docker.</p>
      <p><a href="/users">Ver usuários (dados do PostgreSQL)</a></p>
    </main>
  `);
});

app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, name, email FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao consultar usuários:', err);
    res.status(500).json({ error: 'Falha ao consultar o banco', details: err.message });
  }
});

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
