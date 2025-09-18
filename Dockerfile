
# Etapa base
FROM node:20-alpine
# Diretório de trabalho dentro do container
WORKDIR /usr/src/app
# Copiar package.json e package-lock.json (se houver) e instalar dependências
COPY app/package*.json ./
RUN npm install --omit=dev
# Copiar código da aplicação
COPY app/ ./
# Expor a porta configurada (padrão: 3000)
EXPOSE 3000
# Comando de inicialização
CMD ["npm", "start"]
