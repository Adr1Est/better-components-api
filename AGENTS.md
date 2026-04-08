# AGENTS.md - Guía de Codificación para Agentes

Este documento proporciona pautas para agentes que trabajan en este repositorio.

## Descripción del Proyecto

- **Tipo**: API REST Express.js con TypeScript
- **Gestor de paquetes**: pnpm
- **Base de datos**: PostgreSQL con Prisma ORM
- **Puerto**: Configurado mediante variable de entorno `PORT` (por defecto: ver envs.ts)

## Comandos de Construcción

```bash
# Instalar dependencias
pnpm install

# Construir para producción (usa pkgroll)
pnpm build

# Modo desarrollo con hot reload
pnpm dev

# Ejecutar build de producción
pnpm start
```

## Pruebas

Actualmente, **no hay un framework de pruebas configurado**. Para agregar pruebas:

1. Instalar Vitest (recomendado para este stack): `pnpm add -D vitest`
2. Crear `vitest.config.ts` en la raíz del proyecto
3. Agregar scripts de prueba en package.json

Para ejecutar un solo archivo de prueba una vez agregado el framework: `vitest run path/to/test.spec.ts`

## Pautas de Estilo de Código

### Imports y Alias de Rutas

- Usar el alias de ruta `@/` para imports del directorio `src/`
- Ejemplo: `import { AuthModel } from "@/models/v1/auth.model"`
- Usar named imports cuando sea posible

### TypeScript

- `strict: true` está habilitado en tsconfig.json
- Siempre definir tipos de retorno para funciones
- Evitar el tipo `any` - usar tipado correcto o `unknown`
- Para extender Express Request: crear tipo personalizado en `src/types/`

### Convenciones de Nomenclatura

- **Archivos**: kebab-case (ej., `auth.middleware.ts`)
- **Clases**: PascalCase (ej., `AuthController`)
- **Métodos/Variables**: camelCase (ej., `findUserByEmail`)
- **Constantes**: UPPER_SNAKE_CASE para constantes verdaderas, camelCase para objetos de configuración

### Estructura del Proyecto

```
src/
├── app.ts                 # Punto de entrada de Express
├── config/envs.ts         # Configuración de entorno
├── controllers/v1/        # Manejadores de solicitudes (métodos estáticos en clases)
├── models/v1/             # Consultas a base de datos (Prisma)
├── routes/v1/             # Definiciones de rutas
├── middlewares/           # Middlewares de Express
├── lib/                   # Utilidades (jwt, prisma, etc.)
└── types/                 # Definiciones de tipos personalizados
```

### Patrón de Controladores

- Usar métodos estáticos en clases de controladores
- Manejar try/catch dentro de cada método
- Devolver respuestas directamente (sin capa de servicio por ahora)
- Formato de respuesta: `res.status(code).json({ msg: "..." })`

### Manejo de Errores

- Registrar errores con `console.error("Contexto: ", error)`
- Devolver códigos de estado HTTP apropiados (400, 401, 404, 500)
- Usar español para mensajes de error dirigidos al usuario

### Seguridad

- Secrets JWT y credenciales de base de datos mediante variables de entorno
- Contraseñas hasheadas con bcrypt antes de almacenamiento
- Cookies HttpOnly para refresh tokens
- Validar inputs (formato de email, campos requeridos, etc.)

### Base de Datos (Prisma)

- Schema definido en `prisma/schema.prisma`
- Modelos en `src/models/v1/` encapsulan consultas Prisma
- Usar async/await para todas las operaciones de base de datos

## Variables de Entorno

Crear un archivo `.env` con las variables requeridas (ver `.env.example` o `src/config/envs.ts` como referencia).

## Tareas Comunes

### Agregar una Nueva Ruta

1. Crear método de controlador en `src/controllers/v1/`
2. Crear método de modelo en `src/models/v1/` si es necesario
3. Agregar ruta en `src/routes/v1/` con el middleware apropiado
4. Exportar desde `src/routes/v1/index.ts`

### Cambios en la Base de Datos

1. Editar `prisma/schema.prisma`
2. Ejecutar `pnpm prisma migrate dev` para crear migración
3. Regenerar cliente: `pnpm prisma generate`

## Linting y Verificación de Tipos

Este proyecto no tiene un linter configurado. Para verificación de tipos, puedes usar:

```bash
# Ejecutar compilador TypeScript para verificar tipos
npx tsc --noEmit
```

## Patrones de Solicitud/Respuesta

### Validación del Cuerpo de Solicitud

- Validar campos requeridos al inicio de los métodos de controlador
- Usar regex para validación de email (ver `auth.controller.ts` como ejemplo)
- Devolver 400 con mensaje de error específico para fallos de validación

### Formato de Respuesta

Siempre usar la siguiente estructura JSON:
```typescript
// Éxito
res.status(200).json({ msg: "Operación exitosa" })

// Creado
res.status(201).json({ msg: "Recurso creado", data: {...} })

// Error
res.status(400).json({ msg: "Descripción del error" })
```

### Flujo de Autenticación

- Access tokens van en el header `Authorization: Bearer <token>`
- Refresh tokens almacenados en cookie HttpOnly llamada `bettercomps_rt`
- Middleware de validación de token adjunta `userId` a la solicitud mediante `(req as any).userId`

## Consejos de Organización de Código

### Modelos (Capa de Base de Datos)

- Un archivo de modelo por dominio (user, account, message, etc.)
- Usar instancia del cliente Prisma desde `@/lib/prisma`
- Todos los métodos deben ser `async` y devolver resultados tipados

### Rutas

- Definir rutas en `src/routes/v1/` siguiendo el patrón de nomenclatura `*.routes.ts`
- Usar `Router` de Express para agrupar endpoints relacionados
- Aplicar middleware a nivel de ruta para autorización

### Middlewares

- Ubicar en `src/middlewares/`
- Crear una clase con métodos estáticos para cada middleware
- Ejemplo: `AuthMiddleware.authenticateUser`

## Notas Importantes

- No se encontraron reglas de `.gitignore` - asegurar que los archivos `.env` nunca se commiteen
- El proyecto usa español para todos los mensajes de error dirigidos al usuario
- Los tokens JWT se verifican usando `envs.jwtSecret`
- El hashing de contraseñas usa bcrypt con `envs.saltRounds`
