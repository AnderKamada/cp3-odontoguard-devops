-- Tabela de Eventos
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  event_date TIMESTAMP NOT NULL,
  capacity INTEGER NOT NULL
);
