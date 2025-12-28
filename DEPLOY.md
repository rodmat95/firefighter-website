# Sitio Web de Bomberos - Guía de Despliegue

Este documento contiene los detalles técnicos para configurar, ejecutar y desplegar el Sitio Web de Bomberos.

## 🏁 Comenzando

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [pnpm](https://pnpm.io/) (Gestor de paquetes)

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd firefighter-website
    ```

2.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```

3.  **Configuración del Entorno:**
    Crea un archivo `.env.local` en el directorio raíz y configura las variables de entorno necesarias:
    ```env
    # Variables de ejemplo (ajustar según los requisitos reales)
    RESEND_API_KEY=tu_clave_api_resend
    R2_ACCESS_KEY_ID=tu_r2_access_key
    R2_SECRET_ACCESS_KEY=tu_r2_secret
    R2_BUCKET_NAME=tu_nombre_de_bucket
    R2_ACCOUNT_ID=tu_account_id
    ```

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    pnpm dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 📜 Scripts

- `pnpm dev`: Ejecuta el servidor de desarrollo.
- `pnpm build`: Construye la aplicación para producción.
- `pnpm start`: Inicia el servidor de producción.
- `pnpm lint`: Ejecuta ESLint para detectar problemas en el código.
- `pnpm upload:r2`: Sube activos a Cloudflare R2 usando la configuración interna.
- `pnpm clean:r2 <ruta>`: Limpia una carpeta específica en R2 (ej: `pnpm clean:r2 assets/tour/tiles`).

## 🚀 Características (Técnicas)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) y [Radix UI](https://www.radix-ui.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Base de Datos/Almacenamiento**: Cloudflare R2 (para activos)
- **Email**: Resend API
- **Visita Virtual**: Marzipano

## 📂 Estructura del Proyecto

- `/app`: Rutas y lógica principal de la aplicación.
  - `/tour`: Implementación de la visita virtual.
  - `/api`: Rutas API del backend.
- `/components`: Componentes de UI reutilizables.
- `/public`: Activos estáticos.
- `/scripts`: Scripts de utilidad para mantenimiento y despliegue.

## 🌐 Subdominios y Herramientas (Editores)

El proyecto utiliza un sistema de enrutamiento basado en subdominios (configurado en `proxy.ts`) para acceder a herramientas internas de edición:

| Subdominio | Ruta Interna | Descripción |
| :--- | :--- | :--- |
| `path.domain` | `/path-editor` | Editor de rutas y coordenadas de navegación. |
| `north-set.domain` | `/north-offset-editor` | Herramienta para calibrar el Norte en las escenas 360°. |
| `hotspot.domain` | `/hotspot-editor` | Editor visual para colocar y orientar flechas (hotspots). |

> **Nota:** En desarrollo local (`localhost`), estos subdominios se simulan o se acceden directamente por la ruta interna si el proxy no está interceptando el host local.