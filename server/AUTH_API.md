# API Документация для авторизации и пользователей

## Auth (Авторизация)

### POST /auth/register

Регистрация нового пользователя

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "Иван"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "Иван",
    "lastName": null,
    "phone": null,
    "birthDate": null,
    "language": "ru",
    "createdAt": "2026-01-12T11:51:30.000Z"
  }
}
```

**Примечание:** Фамилия, телефон и дата рождения заполняются позже в профиле.

### POST /auth/login

Вход в систему

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "Иван",
    "lastName": "Иванов",
    "phone": "+7(999)123-45-67",
    "birthDate": "1990-01-15T00:00:00.000Z",
    "language": "ru",
    "createdAt": "2026-01-12T11:51:30.000Z"
  }
}
```

## Users (Пользователи)

### GET /users/profile

Получить профиль текущего пользователя

**Headers:**

```
Authorization: Bearer {access_token}
```

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "Иван",
  "lastName": "Иванов",
  "phone": "+7(999)123-45-67",
  "birthDate": "1990-01-15T00:00:00.000Z",
  "language": "ru",
  "createdAt": "2026-01-12T11:51:30.000Z",
  "updatedAt": "2026-01-12T11:51:30.000Z"
}
```

### PUT /users/profile

Обновить профиль текущего пользователя

**Headers:**

```
Authorization: Bearer {access_token}
```

**Body (все поля опциональны):**

```json
{
  "firstName": "Иван",
  "lastName": "Петров",
  "phone": "+7(999)123-45-67",
  "birthDate": "1990-01-15",
  "language": "en",
  "password": "newpassword123"
}
```

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "Иван",
  "lastName": "Петров",
  "phone": "+7(999)123-45-67",
  "birthDate": "1990-01-15T00:00:00.000Z",
  "language": "en",
  "createdAt": "2026-01-12T11:51:30.000Z",
  "updatedAt": "2026-01-12T12:00:00.000Z"
}
```

## Примечания

1. **JWT токен** действителен 7 дней
2. Для защищенных эндпоинтов (users/\*) требуется JWT токен в заголовке Authorization
3. Пароли хешируются с помощью bcrypt перед сохранением в БД
4. Email должен быть уникальным
5. Минимальная длина пароля - 6 символов

## Переменные окружения

Добавьте в файл `.env`:

```
JWT_SECRET=your-secret-key-change-in-production
```
