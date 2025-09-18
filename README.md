
# Aplicação Dockerizada – Matheus Cuel

**Disciplina:** Programação para Dispositivos Móveis  
**Prova P1 (2025)**

Esta é uma aplicação web simples em Node.js/Express que exibe a mensagem **"Aplicação Dockerizada – Matheus Cuel"** e se conecta a um banco **PostgreSQL** em container, listando usuários fictícios via `/users`.

## Arquitetura
- **web (Node.js 20 + Express + pg)**: porta interna 3000.
- **db (PostgreSQL 16-alpine)**: inicializado com script SQL em `db/init/init.sql` (tabela `users` + 3 registros).

## Pré-requisitos
- Docker e Docker Compose instalados
- Conta no Docker Hub (para a etapa de publicação)

## Como executar localmente (Docker Compose)
1. Clone ou baixe este repositório/pasta.
2. Crie um arquivo `.env` na raiz com base em [`.env.example`](.env.example).
3. No terminal, na raiz do projeto, execute:
   ```bash
   docker compose up --build
   ```
4. Acesse: `http://localhost:3000/` — você verá a mensagem da aplicação.
5. Acesse: `http://localhost:3000/users` — você verá a lista JSON de usuários do banco.

> Healthcheck simples: `GET /health` deve retornar `{ ok: true }` se o banco estiver acessível.

## Testando a conexão e os dados
- O container `db` executa o script `db/init/init.sql` automaticamente na primeira subida, criando a tabela `users` e populando com dados fictícios.
- A rota `/users` faz uma consulta `SELECT id, name, email FROM users`.

## Publicação no Docker Hub (exemplo)
1. Faça login:
   ```bash
   docker login
   ```
2. Construa a imagem (substitua `SEU_USUARIO_DH` pelo seu usuário do Docker Hub):
   ```bash
   docker build -t SEU_USUARIO_DH/dockerized-webapp-matheus-cuel:1.0.0 .
   ```
3. (Opcional) Rode localmente a imagem recém-criada:
   ```bash
   docker run --rm -p 3000:3000 --env-file .env SEU_USUARIO_DH/dockerized-webapp-matheus-cuel:1.0.0
   ```
4. Faça push para o Docker Hub:
   ```bash
   docker push SEU_USUARIO_DH/dockerized-webapp-matheus-cuel:1.0.0
   ```
5. Inclua no relatório o link público no formato:  
   `https://hub.docker.com/r/SEU_USUARIO_DH/dockerized-webapp-matheus-cuel`

## Estrutura de Pastas
```text
.
├─ app/
│  ├─ package.json
│  └─ server.js
├─ db/
│  └─ init/
│     └─ init.sql
├─ .env.example
├─ docker-compose.yml
├─ Dockerfile
└─ README.md
```

## Observações de Segurança
- **Não** inclua senhas reais no `.env` quando enviar a prova.
- Em produção, prefira um gerenciador de segredos e políticas de rede/firewall adequadas.

---

### Checklist de Entrega (Prova)
- [x] Código-fonte da aplicação (_app/server.js_, _app/package.json_)
- [x] **Dockerfile** (raiz)
- [x] **docker-compose.yml** com rede, volume e variáveis
- [x] **.env.example** (placeholders)
- [x] Conexão com banco e exibição de dados (`/users`)
- [x] Passo a passo no **README.md**
- [ ] Link da imagem no **Docker Hub** (você publica e adiciona ao relatório)
---

## Status & Imagem Pública
![CI](https://github.com/Matheuscuel/prova-p1-topicos-2025-docker-app/actions/workflows/docker-ci.yml/badge.svg)

**Docker Hub:** https://hub.docker.com/r/matheuscuel/dockerized-webapp-matheus-cuel

## Rodar via imagem pública (sem Dockerfile/compose)
``` powershell
# usa a porta 3000 e lê variáveis do .env local (apenas WEB_PORT é usada pela app)
docker run --rm -p 3000:3000 --env-file .env matheuscuel/dockerized-webapp-matheus-cuel:latest

# testar (funciona via docker-compose com o Postgres rodando)
Invoke-RestMethod http://localhost:3000/health
Invoke-RestMethod http://localhost:3000/users
```
