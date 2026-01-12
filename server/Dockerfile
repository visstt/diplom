# Dockerfile для сервера (NestJS)
FROM node:20-alpine AS builder

WORKDIR /app

# Установка зависимостей для Prisma
RUN apk add --no-cache openssl

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --legacy-peer-deps

# Генерируем Prisma Client
RUN npm run prisma:generate

# Копируем исходники
COPY . .

# Собираем приложение
RUN npm run build

# Production образ
FROM node:20-alpine

WORKDIR /app

# Установка зависимостей для Prisma
RUN apk add --no-cache openssl

# Копируем package.json и устанавливаем только production зависимости
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

# Устанавливаем Prisma CLI для миграций
RUN npm install prisma@5.8.0 --save-dev --legacy-peer-deps

# Устанавливаем ts-node для выполнения seed
RUN npm install ts-node@10.9.2 typescript@5.3.3 --save-dev --legacy-peer-deps

# Копируем Prisma схему и сгенерированный клиент
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Копируем собранное приложение
COPY --from=builder /app/dist ./dist

# Создаем директорию для uploads
RUN mkdir -p uploads

EXPOSE 3001

# Запуск миграций, seed и приложения
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/src/main.js"]
