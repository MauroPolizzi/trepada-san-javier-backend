# ---------- STAGE 1: Compilación ----------
FROM node:20-alpine AS builder

WORKDIR /usr/src

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Copiar los templates también
COPY templates ./templates

# ---------- STAGE 2: Producción ----------
FROM node:20-alpine

WORKDIR /usr/src

# Copiamos solo lo necesario desde builder
COPY --from=builder /usr/src/package*.json ./
RUN npm install --production

COPY --from=builder /usr/src/dist ./dist
COPY --from=builder /usr/src/templates ./templates

EXPOSE 4000

CMD ["node", "dist/server.js"]
