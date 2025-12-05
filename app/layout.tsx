import type React from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import PageTransition from "@/components/PageTransition";
import { TransitionProvider } from "@/context/TransitionContext";
import ThemeManager from "@/components/ThemeManager";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bomberos Voluntarios ITALIA N° 5",
  description:
    "Colegas y amigos, bienvenidos a la página Oficial de la «Benemérita y Centenaria Compañía Italiana de Bomberos Voluntarios ITALIA N°5». En nuestra web, encontrarán información relacionada con el día a día de los miembros de la Compañía.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={outfit.className}>
        <TransitionProvider>
          <ConditionalNavbar />
          <PageTransition>{children}</PageTransition>
        </TransitionProvider>
      </body>
    </html>
  );
}
