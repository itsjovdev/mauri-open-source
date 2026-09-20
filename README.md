# Mauri

[![Project status](https://img.shields.io/badge/status-active_development-2ea44f?style=flat-square)](#estado-del-proyecto)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-43853d?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-%3E%3D10-cb3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-5.9-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-19-61dafb?style=flat-square&logo=react&logoColor=111111)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/nestjs-11-e0234e?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-ready-4169e1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

Mauri es un software de gestión open source para agencias y consultoras pequeñas (equipos de 2 a 30 personas) que venden proyectos a clientes y facturan por ese trabajo.

Permite gestionar clientes, proyectos, tareas, horas trabajadas, presupuestos, facturas, gastos y reportes desde una sola plataforma autoalojada.

El proyecto está enfocado en equipos que venden servicios por proyecto y necesitan una herramienta operativa clara, mantenible y fácil de desplegar.

## Enfoque del producto

Mauri está orientado a negocios donde el trabajo se organiza alrededor de clientes y proyectos:

- freelancers con varios clientes activos;
- agencias de desarrollo, diseño o marketing;
- estudios creativos;
- consultoras pequeñas;
- equipos técnicos que trabajan por fases, tareas y horas.

Flujo principal:

```txt
Cliente -> Presupuesto -> Proyecto -> Tareas / Horas -> Factura -> Cobro
```

**Qué no es:** no es un CRM de ventas (sin leads ni pipeline comercial) ni un ERP genérico (sin inventario, contabilidad de doble partida, nóminas ni manufactura). Es la pieza intermedia entre un cliente ya cerrado y el cobro de su factura.

## Funcionalidades

- Panel inicial con resumen de actividad y métricas.
- Gestión de clientes, proyectos, empleados y gastos.
- Tablero Kanban de tareas con arrastrar y soltar entre columnas.
- Registro de horas trabajadas por proyecto.
- Creación y gestión de presupuestos, con conversión directa a factura.
- Gestión de facturas.
- Reportes financieros y de proyectos.
- Buscador global tipo *command palette* (`Ctrl/⌘ K`) sobre clientes, proyectos, facturas y presupuestos.
- Paginación en todos los listados.
- Tema claro, oscuro o según el sistema.
- Actividad reciente del sistema.
- Modo demo con base de datos en memoria y datos de prueba precargados.
- Soporte para PostgreSQL en entornos persistentes.

> Los formularios de creación y edición de la mayoría de entidades (clientes, proyectos, empleados, facturas, gastos, tareas) están en desarrollo; por ahora el modo demo se prueba principalmente navegando los datos precargados y el flujo de presupuestos, que sí es funcional de punta a punta.

## Stack técnico

El repositorio está organizado como un monorepo con npm workspaces.

| Capa | Tecnología |
| --- | --- |
| Frontend | React 19, Vite, TypeScript, Tailwind CSS v4 |
| Ruteo | wouter |
| UI | Radix UI, shadcn-style components, lucide-react, class-variance-authority |
| Estado/datos | TanStack Query, cliente HTTP generado desde OpenAPI |
| Gráficos | Recharts |
| Fechas | date-fns |
| Tema claro/oscuro | next-themes |
| Backend | NestJS 11, Fastify, TypeScript |
| Base de datos | PostgreSQL, TypeORM |
| Demo local | sql.js en memoria |
| Validación | class-validator, class-transformer |

## Arquitectura del repositorio

```txt
.
|-- backend
|   |-- src
|   |   |-- common
|   |   |-- config
|   |   |-- database
|   |   |-- modules
|   |   |-- app.module.ts
|   |   `-- main.ts
|   |-- package.json
|   `-- tsconfig.json
|-- frontend
|   |-- public
|   |-- src
|   |   |-- api
|   |   |-- components
|   |   |-- features
|   |   |-- hooks
|   |   |-- lib
|   |   |-- pages
|   |   |-- App.tsx
|   |   `-- main.tsx
|   |-- package.json
|   `-- vite.config.ts
|-- package.json
|-- package-lock.json
`-- README.md
```

## Separación de responsabilidades

### Frontend

La carpeta `frontend` contiene la aplicación web. Su responsabilidad es mostrar la interfaz, consumir la API y organizar la experiencia de usuario.

- `src/pages`: pantallas principales de la aplicación, como clientes, proyectos, tareas, facturas o reportes.
- `src/components`: componentes reutilizables de interfaz.
- `src/components/ui`: componentes base de UI.
- `src/components/layout`: estructura general de la aplicación, navegación lateral y cabecera.
- `src/features`: lógica específica de funcionalidades con mayor alcance.
- `src/api`: cliente HTTP, fetch personalizado y código generado para consumir la API.
- `src/hooks`: hooks reutilizables.
- `src/lib`: utilidades compartidas del frontend.

Las pantallas coordinan la experiencia, los componentes representan piezas reutilizables y `features` agrupa lógica de dominio del frontend.

### Backend

La carpeta `backend` contiene la API. Su responsabilidad es exponer los recursos del sistema, validar datos, aplicar reglas de negocio y persistir información.

- `src/modules`: módulos de dominio. Cada módulo agrupa entidad, controlador, servicio y DTOs.
- `src/common`: utilidades, entidades base, servicios compartidos, DTOs comunes y transformadores.
- `src/config`: configuración de TypeORM y conexión a base de datos.
- `src/database`: seed inicial y migraciones.
- `src/main.ts`: punto de entrada de la API.
- `src/app.module.ts`: módulo raíz de NestJS.

Módulos disponibles:

- `clients`: clientes.
- `projects`: proyectos.
- `tasks`: tareas.
- `employees`: empleados.
- `time-entries`: horas trabajadas.
- `quotes`: presupuestos.
- `invoices`: facturas.
- `expenses`: gastos.
- `reports`: reportes.
- `dashboard`: datos para el panel inicial.
- `metrics`: métricas financieras.
- `activity`: registro de actividad.
- `health`: comprobación básica de estado.

## Requisitos

- Node.js 20 o superior.
- npm 10 o superior.
- PostgreSQL si quieres usar una base de datos persistente.

El modo demo permite arrancar el backend con una base de datos en memoria usando `sql.js`.

## Instalación

Desde la raíz del repositorio:

```bash
npm install
```

## Variables de entorno

El backend incluye un archivo de ejemplo en `backend/.env.example`.

Para usar el modo demo:

```env
DB_DRIVER=memory
PORT=8080
```

Para usar PostgreSQL:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mauri_erp
PORT=8080
```

En modo PostgreSQL, comenta o elimina `DB_DRIVER=memory`.

## Desarrollo

Levantar el backend:

```bash
npm run dev:backend
```

Levantar el frontend:

```bash
npm run dev:frontend
```

Por defecto:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- API: `http://localhost:8080/api`

## Comandos principales

```bash
npm run typecheck
npm run build
npm run seed
npm run migration:run
npm run migration:revert
```

Comandos por aplicación:

```bash
npm run build:frontend
npm run build:backend
npm run typecheck:frontend
npm run typecheck:backend
```

## Base de datos

El proyecto soporta dos modos:

- `memory`: modo demo con `sql.js`, útil para probar la aplicación sin configurar PostgreSQL.
- `postgres`: modo persistente recomendado para desarrollo real, pruebas más completas o despliegue.

Las migraciones viven en `backend/src/database/migrations`.

El seed inicial está en `backend/src/database/seed.ts` e inserta datos de prueba para clientes, empleados, proyectos, tareas, presupuestos, facturas, gastos, horas y actividad.

## Producción

Compilar todo el proyecto:

```bash
npm run build
```

Salida generada:

- Backend: `backend/dist`
- Frontend: `frontend/dist`

Antes de arrancar en producción, configura `DATABASE_URL` y ejecuta las migraciones correspondientes.

## Estado del proyecto

Mauri está en desarrollo activo y cubre las entidades principales del flujo de servicios profesionales. La navegación, los listados y el flujo de presupuestos ya son funcionales; los formularios de creación y edición del resto de entidades son el siguiente foco de trabajo.

## Contribuir

Las contribuciones deben mantenerse alineadas con el enfoque del proyecto: gestión para agencias y consultoras pequeñas, no un CRM de ventas ni un ERP genérico.

Buenas prácticas para contribuir:

- separa cambios de frontend y backend;
- evita mezclar refactors grandes con funcionalidades nuevas;
- ejecuta `npm run typecheck` antes de enviar cambios;
- documenta cualquier cambio que afecte instalación, configuración o comandos;
- mantén las nuevas funcionalidades conectadas con el flujo cliente/presupuesto/proyecto/factura.
