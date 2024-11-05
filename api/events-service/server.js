const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3001;

app.use(express.json());

// Conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'eventdb',
  password: 'mysecretpassword',
  port: 5432,
});

// Criar evento
app.post('/events', async (req, res) => {
  const { name, description, location, event_date, capacity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (name, description, location, event_date, capacity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, location, event_date, capacity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar evento');
  }
});

// Listar eventos
app.get('/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar eventos');
  }
});

app.listen(port, () => {
  console.log(`Eventos API rodando em http://localhost:${port}`);
});
