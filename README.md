# Better Components API

API REST construída con Express.js y TypeScript. Gestiona conversaciones con IA mediante Google Gemini.

## Requisitos

- Node.js (v20+)
- pnpm
- Docker (para PostgreSQL en desarrollo)
- Supabase (para producción)

## Instalación

```bash
pnpm install
```

## Configuración

Crear archivo `.env` con las siguientes variables:

```
DATABASE_URL=postgresql://...
JWT_SECRET=...
ENCRYPTION_SECRET=... # 32 caracteres hexadecimales (64 hex chars)
ORIGIN=...
NODE_ENV=development
PORT=3001
```

## Base de Datos

| Entorno | Solución |
|---------|----------|
| Desarrollo | PostgreSQL en Docker |
| Producción | Supabase |

## Rutas de la API

| Prefijo | Descripción | Autenticación |
|---------|-------------|---------------|
| `/auth` | Registro e inicio de sesión | No |
| `/user` | Gestión de usuarios | Sí |
| `/account` | Gestión de cuentas | Sí |
| `/conversation` | Conversaciones con IA | Sí |
| `/message` | Mensajes en conversaciones | Sí |
| `/key` | API keys de Gemini | Sí |

## Middlewares

### AuthMiddleware
- `authenticateUser`: Valida JWT en header `Authorization: Bearer <token>`
- `refreshTokenValidation`: Valida refresh token en cookie `bettercomps_rt`

### corsMiddleware
- Desarrollo: permite `http://localhost:3000`
- Producción: permite el origen configurado en `ORIGIN`

## Seguridad

### Encriptación de API Keys
Las API keys de Google Gemini se almacenan encriptadas usando **AES-256-CBC**:
- Clave derivada de `ENCRYPTION_SECRET`
- Cada encriptación usa un IV único aleatorio
- Formato almacenado: `iv:encryptedData`

## Scripts

```bash
pnpm dev     # Desarrollo con hot reload
pnpm build   # Construcción para producción
pnpm start   # Ejecutar en producción
```

## Dependencias Principales

- `express` - Framework web
- `@prisma/client` - ORM para PostgreSQL
- `jsonwebtoken` - Autenticación JWT
- `bcrypt` - Hashing de contraseñas
- `@google/genai` - Cliente de Google Gemini
- `cookie-parser` - Manejo de cookies
- `cors` - CORS

## Licencia

MIT License - ver archivo [LICENSE](LICENSE)
