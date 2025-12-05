## Propósito

Guía corta y accionable para agentes de codificación (Copilot / AI) que trabajen en este repositorio Next.js + Tailwind. Contiene el panorama general, convenciones de implementación y comandos de desarrollo concretos.

## Checklist (requisitos a cubrir)

- Entender arquitectura y responsabilidades (app/, components/, components/ui)
- Flujo de desarrollo (instalación, dev, build, start, lint)
- Convenciones de componentes y estilos (`use client`, `cn`, CVA, CSS vars)
- Integraciones y dependencias externas clave
- Ejemplos concretos y rutas a revisar

## Panorama general (por qué y cómo está organizado)

- Framework: Next.js (carpeta `app/`, Next 15) con React 19. Rutas y páginas están en `app/`.
- Biblioteca de UI: `components/ui/` contiene primitives (Radix + CVA) y patrones reutilizables. Componentes de alto nivel en `components/` (ej. `navbar.tsx`, `theme-provider.tsx`).
- Estilos: variables CSS definidas en `app/globals.css` y `styles/globals.css`. Tailwind usa esas variables desde `tailwind.config.ts` (colores y tokens).
- Estado/UX: muchas piezas son client components con "use client" (ver `components/ui/*`). Prefiere forwardRef + displayName para componentes.

## Flujo de desarrollo (comandos y notas importantes)

- Se usa pnpm (hay `pnpm-lock.yaml`). Comandos en `package.json`:

```powershell
pnpm install
pnpm dev    # next dev
pnpm build  # next build
pnpm start  # next start (después de build)
pnpm lint   # next lint
```

- Nota crítica: `next.config.mjs` desactiva la validación estricta de ESLint y TypeScript en build (ignoreDuringBuilds / ignoreBuildErrors = true). No asumir que la build valida tipos o lint — ejecutar `pnpm -w tsc --noEmit` o `pnpm lint` localmente si necesitas seguridad adicional.

## Convenciones y patrones detectados (ejemplos concretos)

- Helper de clases: usa `cn(...)` en `lib/utils.ts` (combina clsx + tailwind-merge). Siempre usarlo para concatenar clases.
- Variant styling: usa `class-variance-authority` (CVA) en componentes como `components/ui/sidebar.tsx` y `components/ui/sheet.tsx` para manejar variantes de estilo.
- Radix primitives: componentes UI construidos sobre `@radix-ui/*` (ver `components/ui/*`). Mantener las props y `displayName` compatibles con los primitives.
- Client vs Server: los UI controls usan "use client" arriba del archivo; las páginas en `app/` pueden ser server components. Añadir "use client" solo cuando interactúen con hooks/estado o eventos del navegador.
- Export y typing: componentes usan `forwardRef` con tipos React.ElementRef y ComponentPropsWithoutRef. Seguir esa firma para nuevos controles.
- Accesos y atajos: el `sidebar` implementa atajo de teclado Ctrl/Cmd+B (`components/ui/sidebar.tsx`) y guarda estado en cookie (`SIDEBAR_COOKIE_NAME`). Respetar estas constantes si extiendes esa funcionalidad.

## Integraciones y dependencias clave

- @radix-ui/\*, lucide-react (íconos), cmdk (command palette), sonner (toasts), recharts — evita reemplazarlas sin motivo.
- next-themes: gestión de tema; `components/theme-provider.tsx` orquesta Dark/Light.
- Imágenes: `next.config.mjs` marca `images.unoptimized = true`, y hay imágenes en `public/` (placeholder). No asumir optimización automática.

## Qué revisar al hacer cambios

- Revisar `tailwind.config.ts` cuando cambies tokens o colores; muchas clases dependen de variables CSS.
- Revisar `app/globals.css` y `styles/globals.css` para variables y utilidades globales (p. ej. animaciones, scrollbar overrides).
- Cuando añadas un componente UI nuevo: colocarlo en `components/ui/`, usar `use client` si es interactivo, usar `cn` y `forwardRef`, y exportarlo junto a `displayName`.

## Ejemplo rápido (cómo añadir un componente UI)

- Ruta sugerida: `components/ui/MyButton.tsx`.
- Patrón (resumido):

```tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";
export const MyButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...p }, ref) => (
  <button ref={ref} className={cn("rounded px-3 py-2", className)} {...p} />
));
MyButton.displayName = "MyButton";
```

## Limitaciones y puntos de atención

- No se encontraron tests o scripts de pruebas automáticas. Añadir pruebas es un paso posterior si se requiere.
- Types y ESLint están ignorados en build por configuración actual — CI puede necesitar pasos explícitos para validar calidad.

## Archivos de referencia (leer antes de cambiar)

- `package.json` (scripts & deps)
- `next.config.mjs` (build flags, imágenes)
- `tailwind.config.ts` (tokens y paths)
- `lib/utils.ts` (helper `cn`)
- `components/theme-provider.tsx`, `components/navbar.tsx`, `components/ui/sidebar.tsx`
- `app/globals.css`, `styles/globals.css`

## Preguntas y seguimiento

¿Qué parte quieres que haga a continuación? Puedo:

- añadir comprobaciones de CI para tipos/lint (recomendada),
- generar una plantilla de componente y test,
- o afinar estas instrucciones con más ejemplos concretos si me indicas una área (UI, forms, integraciones).

Por favor indica si deseas que ajuste tono/longitud o agregue pasos de CI específicos.
