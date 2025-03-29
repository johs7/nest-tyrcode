# Prueba Técnica NestJS - Nivel Junior

## 🚀 Objetivo General

Desarrollar un sistema de gestión de usuarios y productos utilizando NestJS, aplicando una arquitectura de microservicios comunicados por NATS, con autenticación JWT, autorización basada en roles y buenas prácticas como DDD, testing y seguridad HTTP.

---

## 🎳 Tecnologías Principales

- **NestJS v11**
- **TypeORM** + PostgreSQL
- **NATS** (comunicación entre microservicios)
- **JWT** para autenticación
- **Docker** (para levantar NATS)
- **Postman** (pruebas manuales)
- **Swagger** (documentación interactiva)
- **Helmet** (protección HTTP headers)
- **Throttler** (Rate Limiting)
- **Jest** (testing unitario)

---

## 📚 Arquitectura Aplicada

Se aplicó el enfoque de **Domain-Driven Design (DDD)** para mantener una clara separación de responsabilidades:

- `domain/`: Entidades puras, interfaces y contratos.
- `application/`: Lógica de negocio y casos de uso.
- `infraestructure/`: Controladores, repositorios TypeORM y DTOs.
- `dto/`: Objetos de transferencia de datos para validación y transporte.

---

## 🧭 Diagrama de Arquitectura - Comunicación entre Microservicios

A continuación se muestra un diagrama que representa la arquitectura general del sistema:

![Diagrama de arquitectura](https://i.postimg.cc/q7VCt8WC/Sin-t-tulo-2024-12-27-1239.png)

---

### 🧩 Flujo Detallado del Sistema

1. **Postman / Cliente HTTP**:

   - Realiza solicitudes como registro, login o creación de productos.

2. **API Gateway**:

   - Punto de entrada principal.
   - Valida JWT, aplica guards, documenta con Swagger y comunica con microservicios vía NATS.

3. **NATS**:

   - Sistema de mensajería para comunicación interna asincrónica entre microservicios.
   - Asegura bajo acoplamiento y escalabilidad.

4. **Microservicio de Usuarios**:

   - Registro y autenticación de usuarios.
   - Endpoints internos: `CREATE_USER`, `FIND_USER_BY_ID`, `FIND_USER_BY_EMAIL`.

5. **Microservicio de Productos**:

   - Gestión de productos asociados a usuarios autenticados.
   - Endpoints internos: `CREATE_PRODUCT`, `GET_PRODUCTS_BY_USER`.

6. **Bases de Datos PostgreSQL**:
   - Cada microservicio gestiona su propia base de datos.
   - Garantiza autonomía de cada dominio.

---

## 🏗️ Estructura de Proyecto

```bash
nest-tyrcode/
├── api-gateway/
│   ├── src/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── common/
│   │   ├── main.ts
│   │   └── app.module.ts
├── users-service/
│   └── src/modules/users/
│       ├── domain/
│       ├── application/
│       ├── infraestructure/
│       └── dto/
├── products-service/
│   └── misma estructura de users
```

---

## 🔧 Instalación y Ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar `.env` y asegurarse que PostgreSQL esté activo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nestdb
JWT_SECRET=supersecret
```

### 3. Levantar NATS con Docker

```bash
docker run -p 4222:4222 -ti nats:latest
```

### 4. Ejecutar los microservicios y gateway

```bash
# En cada carpeta (api-gateway, users-service, products-service)
npm run start:dev
```

---

## 🔢 Endpoints disponibles (vía Gateway)

### Autenticación

- `POST /auth/register`: Registro de usuario
- `POST /auth/login`: Retorna JWT

### Productos

- `POST /products`: Crear producto (requiere JWT)
- `GET /products/me`: Obtener productos del usuario autenticado

---

## 📖 Swagger

Documentación generada automáticamente:

```bash
http://localhost:3051/docs
```

Incluye soporte para JWT con autorización tipo `Bearer`.

---

## 🛡️ Seguridad y Middlewares

### Helmet

```ts
app.use(helmet());
```

### CORS

```ts
app.use(cors({ origin: "*", credentials: true }));
```

### Rate Limiting

```ts
ThrottlerModule.forRoot({
  ttl: 60_000, // 1 minuto
  limit: 10, // 10 solicitudes por minuto
});
```

### Global Exception Filter

```ts
app.useGlobalFilters(new HttpExceptionFilter());
```

---

## 🧪 Testing con Jest

### ✅ Pruebas implementadas

- Pruebas unitarias con mocks en:
  - `auth.controller`
  - `auth.service`
  - `products.controller`
  - `products.service`

### 📁 Organización

- Dentro de carpetas `__tests__` o como `*.spec.ts`.

### ▶️ Comandos

```bash
npm run test
npm run test:watch
npm run test:cov
```

---

## 🧰 Comandos Útiles

| Acción                     | Comando                               |
| -------------------------- | ------------------------------------- |
| Instalar dependencias      | `npm install`                         |
| Ejecutar en desarrollo     | `npm run start:dev`                   |
| Ejecutar pruebas unitarias | `npm run test`                        |
| Ver cobertura              | `npm run test:cov`                    |
| Levantar NATS con Docker   | `docker run -p 4222:4222 nats:latest` |

---

## ✅ Estado del Proyecto

- [x] Registro y login de usuarios
- [x] Protección de rutas con JWT
- [x] Gestión de productos por usuario
- [x] Comunicación entre microservicios (NATS)
- [x] Documentación Swagger
- [x] Seguridad con Helmet y CORS
- [x] Rate limiting con `@nestjs/throttler`
- [x] Testing unitario con Jest

---

## ✨ Autor

Desarrollado con compromiso profesional por **Johanssen Roque** como parte de una prueba técnica NestJS, aplicando los principios de arquitectura limpia, seguridad, escalabilidad y calidad de código.
