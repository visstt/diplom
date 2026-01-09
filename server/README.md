# Titan Backend Server

NestJS backend server for Titan product catalog with PostgreSQL and Prisma ORM.

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database (with database named "Titan")
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

## Running the app

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Documentation

После запуска сервера Swagger документация доступна по адресу:

- **Swagger UI**: http://localhost:3000/api

Swagger предоставляет интерактивную документацию API, где можно:

- Просмотреть все доступные эндпоинты
- Увидеть структуру запросов и ответов
- Протестировать API прямо в браузере

## API Endpoints

### Products

- `GET /products` - Get all products (optional: ?category=CategoryName)
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Example Product JSON

```json
{
  "name": "1С Бухгалтерия",
  "price": 4400,
  "image": "/img/1c-accounting.jpg",
  "description": "Полный контроль финансовой деятельности компании",
  "category": "Программное обеспечение",
  "variants": ["Базовая", "ПРОФ", "КРОП"],
  "benefits": [
    "Строгое соответствие законодательству",
    "Подходит юрлицам на УСН, ПСН, ОСНО"
  ],
  "features": [
    "Учет и отчетность",
    "Управление финансовыми ресурсами",
    "Работа с контрагентами",
    "Производственный учет"
  ]
}
```

## Prisma Commands

```bash
# Open Prisma Studio (GUI for database)
npm run prisma:studio

# Create a new migration
npm run prisma:migrate

# Generate Prisma Client after schema changes
npm run prisma:generate
```

## Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/Titan?schema=public"
PORT=3000
```

## Database Schema

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Float
  image       String
  description String?
  category    String?
  variants    String[] @default([])     // Варианты товара (Базовая, ПРОФ, КРОП)
  benefits    String[] @default([])     // Преимущества товара
  features    String[] @default([])     // Функциональные возможности
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
