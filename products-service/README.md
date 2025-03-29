# Prueba Técnica NestJS - Nivel Junior

## 🚀 Objetivo General

Desarrollar un sistema de gestión de usuarios y productos utilizando NestJS, con comunicación entre microservicios a través de NATS, autenticación con JWT, y autorización mediante guards y buenas prácticas de arquitectura (DDD).

---

## 🎳 Tecnologías Principales

- NestJS v11
- TypeORM
- PostgreSQL
- NATS (comunicación entre microservicios)
- JWT para autenticación
- Docker (usado para levantar NATS)
- Postman (para pruebas manuales)
- Swagger (documentación de API)

---

## 📚 Arquitectura Aplicada

Se implementó **Domain-Driven Design (DDD)** para una separación clara de responsabilidades:

- `domain/`: Entidades puras y contratos
- `application/`: Casos de uso (servicios de aplicación)
- `infraestructure/`: Repositorios TypeORM, controladores, entidades ORM
- `dto/`: Objetos de transferencia de datos

---

## 🏗️ Estructura de Proyecto

```
nest-tyrcode/
├── api-gateway/
├── users-service/
│   ├── src/modules/users/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infraestructure/
│   │   └── dto/
├── products-service/
│   └── misma estructura de users
```

---

## 🔧 Instalación y Ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Asegurar PostgreSQL activo y .env configurado:

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

### 4. Ejecutar microservicios y gateway

```bash
# En cada carpeta
npm run start:dev
```

---

## 🔢 Endpoints disponibles

### Usuarios (vía Gateway)

- `POST /auth/register`: Crea un nuevo usuario
- `POST /auth/login`: Devuelve un token JWT

### Productos (vía Gateway con token JWT)

- `POST /products`: Crea un producto (requiere JWT)
- `GET /products/me`: Obtiene productos del usuario autenticado
- `GET /products/:id`: Consulta productos por ID de usuario

---

## 🔐 Seguridad

- Contraseñas encriptadas con bcrypt
- Validaciones con class-validator
- Rutas protegidas con guards y JWT
- Roles definidos con enum

---

## 📄 Swagger

- Documentación disponible en: [http://localhost:3053/docs](http://localhost:3053/docs)

---

## 📝 Buenas Prácticas Aplicadas

- Patrón **Domain-Driven Design (DDD)**
- Separación de responsabilidades (infra vs dominio)
- Validaciones DTO
- Uso correcto de Providers e interfaces
- Composición modular con `@Module`
- Uso de NATS ClientProxy para comunicación entre MS
- Pruebas con Postman y Swagger

---

## 🙏 Estado del Proyecto

- [x] Registro de usuarios funcionando
- [x] Login con JWT funcionando
- [x] Protección de rutas JWT
- [x] Creación de productos
- [x] Consulta de productos por usuario
- [x] Comunicación entre microservicios vía NATS funcionando correctamente
- [x] Documentación Swagger activa
- [x] Docker usado para levantar NATS exitosamente

> Este proyecto demuestra el dominio de microservicios en NestJS, aplicación de patrones como DDD, integración con NATS, uso de JWT para seguridad, y exposición de endpoints con Swagger. Preparado para escalar y aplicar testing automatizado.

---

## ✨ Autor

Desarrollado por Johanssen Roque como parte de una prueba técnica con enfoque profesional ✨
