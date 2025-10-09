# Frontend Mundo Viejo - Aplicación Conectada

Este proyecto fue generado con [Vite](https://vite.dev/) usando React + TypeScript + SWC y está completamente integrado con el backend NestJS.

## 🚀 Inicio Rápido

### Prerequisitos
- Node.js (versión 16 o superior)
- PostgreSQL corriendo
- Backend de Mundo Viejo ejecutándose en puerto 3000

### Instalación y Configuración

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Verificar que el backend esté corriendo:**
   - El backend debe estar ejecutándose en `http://localhost:3000`
   - Verificar que la base de datos PostgreSQL esté conectada

3. **Iniciar el frontend:**
   ```bash
   npm run dev
   ```
   - La aplicación estará disponible en `http://localhost:5173/`
   - El proxy está configurado para redirigir `/api/*` al backend

## 🔗 Conexión Frontend-Backend

### Configuración del Proxy
El proyecto está configurado con un proxy en Vite que redirige todas las peticiones `/api/*` al backend:
```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

### Servicios de API
- **Ubicación:** `src/services/api.ts`
- **Configuración:** Axios con interceptores para autenticación automática
- **Base URL:** `/api` (proxy a localhost:3000)

### Contexto de Autenticación
- **Ubicación:** `src/contexts/AuthContext.tsx`
- **Funcionalidad:** Manejo del estado de usuario logueado
- **Persistencia:** LocalStorage para token y datos de usuario

### Hooks Personalizados
- **Ubicación:** `src/hooks/useApi.ts`
- **Funcionalidad:** Hooks para mesas, productos, categorías, órdenes, etc.
- **Características:** Loading states, error handling, refetch automático

## 🛡️ Rutas Protegidas

El frontend incluye un sistema de rutas protegidas que:
- Verifica autenticación antes de acceder a páginas
- Redirige según el rol del usuario (cajero/mesero)
- Protege rutas específicas por rol

## 👥 Roles y Navegación

### Cajero
- Acceso completo a todas las funciones de caja
- Gestión de pagos y cuadre de caja
- Vista de órdenes para llevar

### Mesero  
- Gestión de mesas y órdenes
- Navegación por pasillos
- Crear y gestionar órdenes

## 🗂️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── ProtectedRoute.tsx
├── contexts/           # Contextos de React
│   └── AuthContext.tsx
├── hooks/             # Hooks personalizados
│   └── useApi.ts
├── pages/             # Componentes de páginas
├── services/          # Servicios de API
│   └── api.ts
└── styles/            # Archivos CSS
```

## 🔑 Credenciales por Defecto

- **Usuario:** admin
- **Contraseña:** [Consultar con el equipo de backend]

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo (puerto 5173)
- `npm run build` - Construye para producción
- `npm run preview` - Vista previa de producción
- `npm run lint` - Ejecuta el linter

## 🔧 Tecnologías Integradas

- **Frontend:** React + TypeScript + Vite
- **Estilos:** TailwindCSS
- **Navegación:** React Router DOM
- **HTTP Client:** Axios con interceptores
- **Estado:** Context API + React Hooks
- **Backend:** NestJS + PostgreSQL

## 📡 Endpoints de API

Todos los endpoints están disponibles a través del servicio de API:
- Autenticación: `/auth/login`, `/auth/register`
- Mesas: `/mesas`
- Productos: `/productos` 
- Categorías: `/categoria`
- Órdenes: `/ordenes`
- Pagos: `/pagos`
- Y más...

## 🚨 Solución de Problemas

### Error de Conexión
- Verificar que el backend esté corriendo en puerto 3000
- Verificar conexión a la base de datos PostgreSQL

### Error de CORS
- El backend ya está configurado para aceptar peticiones del frontend

### Error de Autenticación
- Limpiar localStorage del navegador
- Verificar credenciales con el administrador

## 🤝 Desarrollo Colaborativo

Este es un proyecto colaborativo. Para mantener la consistencia:
- No cambiar puertos sin consultar al equipo
- Seguir las convenciones de naming establecidas
- Probar tanto frontend como backend antes de hacer commits
- Documentar cualquier cambio en la configuración
