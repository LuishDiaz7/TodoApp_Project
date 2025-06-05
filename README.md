# TodoApp Fullstack

Este repositorio contiene una aplicación completa de gestión de tareas (TodoApp), desarrollada como parte de la asignatura **Herramientas de Programación III**.

## 🚀 Funcionalidades Principales

- **Autenticación de Usuarios:** Registro e inicio de sesión con protección JWT
- **Gestión de Tareas (Assignments):** Operaciones CRUD para tareas
- **Roles de Usuario:** Sistema de autorización basado en roles
- **API RESTful:** Endpoints bien definidos para interacción frontend-backend

## 🛠️ Tecnologías Utilizadas

### Backend
- ASP.NET Core (.NET 9.0)
- Entity Framework Core
- SQL Server (LocalDB)
- JWT (JSON Web Tokens)
- Swagger/OpenAPI

### Frontend
- React (con Vite)
- JavaScript (ES6+)
- Axios

## 📋 Prerrequisitos

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js y npm](https://nodejs.org/en/download/)
- SQL Server (LocalDB)
- Visual Studio 2022 (opcional)
- Editor de código (VS Code recomendado)
- Git

## 🚀 Instalación y Ejecución

### 1. Clonar el Repositorio

```bash
git clone https://github.com/LuishDiaz7/TodoApp_Project.git
cd TodoApp_Project
```

### 2. Configuración e Inicio del Backend

```bash
cd TodoAppBackend
```

**Configurar cadena de conexión en `appsettings.json`:**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=(LocalDB)\\MSSQLLocalDB;Initial Catalog=TodoAppBackend;Integrated Security=true;"
  }
}
```

**Aplicar migraciones:**

```bash
dotnet ef database update
# O si necesita generar migraciones:
dotnet ef migrations add InitialCreate
dotnet ef database update
```

**Ejecutar backend:**

```bash
dotnet run
```

### 3. Configuración e Inicio del Frontend

```bash
cd ../TodoAppFrontend
npm install
npm start
```

## 🖥️ Funcionalidad y Uso

- **Registro de Usuarios:** Formulario en frontend o endpoint `POST /api/Account/register`
- **Inicio de Sesión:** Obtiene token JWT para API protegida
- **Gestión de Tareas:**
  - Crear nuevas tareas
  - Listar tareas existentes
  - Editar detalles/estado
  - Eliminar tareas

## 📂 Estructura del Proyecto

```
TodoApp_Project/
├── TodoAppBackend/       # API ASP.NET Core
├── TodoAppFrontend/      # Interfaz React
└── TodoApp_Project.sln   # Solución Visual Studio
```

## 🌐 URLs de Acceso

- **Backend API:** http://localhost:5095
- **Documentación Swagger:** http://localhost:5095/swagger
- **Frontend:** http://localhost:5173

## 📝 Notas

La documentación Swagger estará disponible en `http://localhost:5095/swagger` y el frontend en `http://localhost:5173` por defecto.
