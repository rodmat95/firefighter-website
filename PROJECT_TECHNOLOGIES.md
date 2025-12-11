# Project Technologies

The **firefighter‑website** project is built with the following stack (generated from `package.json`).

## Core Framework

- **Next.js** `16.0.7` – React framework for server‑side rendering and static generation.
- **React** `19.2.1` – UI library.
- **TypeScript** `5.9.3` – Type‑safe JavaScript.

## Package Manager

- **pnpm** – Used for installing and managing dependencies (see `pnpm-lock.yaml`).

## UI / Component Libraries

- **Radix UI** – Accessible UI primitives (`@radix-ui/*`).
- **Tailwind CSS** `3.4.17` – Utility‑first CSS framework.
- **Tailwind Merge** – Class name merging.
- **Tailwind CSS Animate** – Animation utilities.
- **lucide-react** – Icon set.
- **geist** – UI components.
- **embla-carousel-react** – Carousel component.
- **embla-carousel-autoplay** – Autoplay plugin for Embla Carousel.
- **recharts** – Charting library.
- **react‑day‑picker** – Date picker.
- **react‑hook‑form** – Form handling.
- **zod** – Schema validation.
- **sonner** – Toast notifications.
- **vaul** – Drawer component.
- **cmdk** – Command‑menu component.

## State / Utilities

- **clsx** – Conditional class names.
- **date‑fns** – Date utilities.
- **input‑otp** – OTP input.
- **react‑resizable‑panels** – Resizable layout panels.
- **react‑icons** – Icon collection.
- **next‑themes** – Theme handling.
- **@vercel/analytics** – Analytics integration.

## Animation

- **framer‑motion** `^12.23.12` – Declarative animations (used for navbar, etc.).

## Cloud / Storage

- **@aws-sdk/client-s3** – Interact with Cloudflare R2 (S3‑compatible API).
- **Cloudflare R2** – Object storage for images, videos, and static assets (S3-compatible).

## Image Optimization

- **ImageMagick** – Command-line tool for image processing, conversion, and optimization (PNG → WebP, JPG, resizing).

## Build / Linting

- **eslint** (via `next lint`).
- **postcss** – CSS processing.
- **tsx** – TypeScript runner for scripts (e.g., `scripts/upload-to-r2.ts`).

## Misc

- **dotenv** – Environment variable loading.
- **mime‑types** – MIME type detection for uploads.

## Repository & Hosting

- **GitHub** – Source code repository (remote origin).
- **Vercel** – Deployment platform and hosting for the Next.js application.

## 3D Tour

- **Marzipano** – WebGL‑based 360°/panorama viewer used for the interactive virtual tour.

_This file is generated from `package.json` and kept up‑to‑date manually when dependencies change._
