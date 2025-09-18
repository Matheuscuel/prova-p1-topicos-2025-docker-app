
-- Criação de tabela e seed inicial
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

INSERT INTO users (name, email) VALUES
  ('Alice Teste', 'alice@example.com'),
  ('Bruno Exemplo', 'bruno@example.com'),
  ('Carla Fictícia', 'carla@example.com')
ON CONFLICT DO NOTHING;
